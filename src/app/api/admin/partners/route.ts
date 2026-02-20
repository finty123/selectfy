import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
// Se você estiver usando o Prisma aqui dentro, adicione também:
export const revalidate = 0;

export async function GET() {
  try {
    const partners = await prisma.user.findMany({
      where: { role: "PARTNER" }, // Filtra apenas parceiros
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar parceiros" }, { status: 500 });
  }
}
