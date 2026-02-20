import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  try {
    const { status } = await req.json(); // "COMPLETED" ou "REJECTED"
    const withdrawId = parseInt(params.id);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Busca o saque específico
      const withdrawal = await tx.withdrawal.findUnique({
        where: { id: withdrawId },
      });

      if (!withdrawal || withdrawal.status !== "PENDING") {
        throw new Error("Solicitação inválida ou já processada.");
      }

      // 2. Se o Admin REJEITAR, o dinheiro volta para o saldo do usuário
      if (status === "REJECTED") {
        await tx.user.update({
          where: { id: withdrawal.userId },
          data: { balance: { increment: withdrawal.amount } },
        });
      }

      // 3. Atualiza o registro do saque
      return await tx.withdrawal.update({
        where: { id: withdrawId },
        data: { status },
      });
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}