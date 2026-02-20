import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    // Buscamos todos para garantir que nada escape, 
    // e filtramos para não listar o próprio admin
    const partners = await prisma.user.findMany({
      where: {
        NOT: {
          role: "ADMIN"
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`[API] Total de parceiros encontrados no banco: ${partners.length}`);
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Erro na API de busca:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}