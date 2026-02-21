import prisma from "@/lib/prisma"; 
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { assignments: true } } }
    });
    return NextResponse.json(products);
  } catch (error) {
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
        niche: body.niche,
        baseUrl: body.baseUrl,
        createdById: Number(body.createdById), 
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro POST Product:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
