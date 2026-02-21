import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Garante que o ID existe antes de usar
    const id = params?.id ? parseInt(params.id) : null;

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const partner = await prisma.user.findUnique({
      where: { id },
    });

    return NextResponse.json(partner || { error: "Não encontrado" }, { status: partner ? 200 : 404 });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}