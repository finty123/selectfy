import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ESTAS LINHAS PRECISAM SER AS PRIMEIRAS
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Usando Promise para garantir dinamismo
) {
  try {
    const { id } = await params;
    const partnerId = parseInt(id);

    if (isNaN(partnerId)) {
      return NextResponse.json({ error: "ID Inválido" }, { status: 400 });
    }

    const partner = await prisma.user.findUnique({
      where: { id: partnerId },
    });

    return NextResponse.json(partner || { error: "Não encontrado" }, { status: partner ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// Método PATCH para garantir que o Next veja múltiplos métodos e não tente estatizar
export async function PATCH(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const updated = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}