import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// FORÇA O NEXT.JS A NÃO RODAR ISSO NO BUILD
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const partner = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        // Adicione aqui apenas os campos que você realmente precisa exibir
      }
    });

    if (!partner) {
      return NextResponse.json({ error: "Parceiro não encontrado" }, { status: 404 });
    }

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    const updatedPartner = await prisma.user.update({
      where: { id: id },
      data: {
        status: body.status,
        // Adicione outros campos que o admin pode editar
      },
    });

    return NextResponse.json(updatedPartner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar parceiro" }, { status: 500 });
  }
}