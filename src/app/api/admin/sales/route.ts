export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, commissionPercentage: true } },
        product: { select: { name: true, niche: true } }
      }
    });
    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar vendas" }, { status: 500 });
  }
}
