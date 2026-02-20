import prisma from "@/lib/prisma"; // Removido as chaves { }
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

// ESSENCIAIS PARA O BUILD DA VERCEL PASSAR:
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// PATCH para atualizar o status do PARCEIRO (Ativo/Inativo)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
  }

  try {
    const { status } = await req.json(); // Ex: "ACTIVE" ou "INACTIVE"
    const partnerId = parseInt(params.id);

    const updatedPartner = await prisma.user.update({
      where: { id: partnerId },
      data: { status },
    });

    return NextResponse.json(updatedPartner);
  } catch (error: any) {
    console.error("Erro ao atualizar parceiro:", error);
    return NextResponse.json({ error: "Erro ao atualizar parceiro" }, { status: 500 });
  }
}

// GET para buscar um parceiro específico
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const partner = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!partner) {
      return NextResponse.json({ error: "Parceiro não encontrado" }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar parceiro" }, { status: 500 });
  }
}