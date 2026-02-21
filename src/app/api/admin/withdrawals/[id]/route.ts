import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// ESTAS LINHAS SÃO OBRIGATÓRIAS PARA O DEPLOY PASSAR
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id: parseInt(params.id) },
      include: { user: true }
    });

    if (!withdrawal) {
      return NextResponse.json({ error: "Saque não encontrado" }, { status: 404 });
    }

    return NextResponse.json(withdrawal);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar saque" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const { status } = await req.json();
    const id = parseInt(params.id);

    const updated = await prisma.withdrawal.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar saque" }, { status: 500 });
  }
}