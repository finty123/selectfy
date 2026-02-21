import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// TRAVAS OBRIGATÓRIAS NO TOPO - Não mova estas linhas
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Verifica sessão apenas para garantir segurança, mas o foco é o Prisma
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 403 });
    }

    const partners = await prisma.user.findMany({
      where: { role: "PARTNER" },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(partners);
  } catch (error) {
    console.error("Erro GET Partners:", error);
    return NextResponse.json({ error: "Erro ao buscar parceiros" }, { status: 500 });
  }
}

// Se você tiver um POST aqui para criar parceiros, mantenha-o, 
// mas garanta que ele use o 'prisma' importado corretamente.