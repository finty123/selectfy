import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  try {
    const withdrawals = await prisma.withdrawal.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            // Adicione aqui se tiver campos como pixKey no modelo User
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(withdrawals);
  } catch (error) {
    console.error("Erro ao listar saques:", error);
    return NextResponse.json({ error: "Erro ao buscar saques" }, { status: 500 });
  }
}
