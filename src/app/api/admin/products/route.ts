import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        _count: { 
          select: { assignments: true } 
        } 
      }
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro GET Products:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        platform: body.platform,
        niche: body.niche, // <-- Novo campo adicionado
        baseUrl: body.baseUrl,
        // Garantindo que o ID seja um número inteiro para o Prisma não dar erro
        createdById: Number(body.createdById), 
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro POST Product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}