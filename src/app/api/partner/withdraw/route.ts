import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, amount } = await req.json();

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });

      if (!user || user.balance < amount) {
        return NextResponse.json({ error: "Saldo insuficiente" }, { status: 400 });
      }

      if (!user.pixKey) {
        return NextResponse.json({ error: "Chave PIX não cadastrada" }, { status: 400 });
      }

      // Cria a solicitação de saque com snapshot dos dados PIX atuais
      const withdrawal = await tx.withdrawal.create({
        data: {
          userId,
          amount,
          pixKey: user.pixKey,
          pixKeyType: user.pixKeyType || "ALEATORIA",
          status: "PENDING",
        },
      });

      // Deduz do saldo do usuário para evitar "gasto duplo"
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } },
      });

      return NextResponse.json(withdrawal);
    });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar saque" }, { status: 500 });
  }
}