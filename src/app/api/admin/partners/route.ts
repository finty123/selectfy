import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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