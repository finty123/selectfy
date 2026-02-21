import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// A trava de segurança para o build não falhar
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Exemplo de busca de estatísticas
    const stats = await prisma.user.count({ where: { role: 'PARTNER' } });
    
    return NextResponse.json({ partnersCount: stats });
  } catch (error) {
    return NextResponse.json({ error: "Erro no dashboard API" }, { status: 500 });
  }
}