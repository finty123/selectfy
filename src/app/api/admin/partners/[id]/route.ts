import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// FORÇANDO O NEXT.JS A IGNORAR O BANCO DE DADOS NO BUILD
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const partnerId = parseInt(params.id);
    
    if (isNaN(partnerId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const partner = await prisma.user.findUnique({
      where: { id: partnerId },
    });

    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar parceiro" }, { status: 500 });
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
    const partnerId = parseInt(params.id);

    const updatedPartner = await prisma.user.update({
      where: { id: partnerId },
      data: { status },
    });

    return NextResponse.json(updatedPartner);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar parceiro" }, { status: 500 });
  }
}