import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return Response.json({ error: "Acesso negado" }, { status: 403 });
  }

  // 1. Métricas Globais
  const globalStats = await prisma.sale.aggregate({
    _sum: {
      grossAmount: true,
      netAmount: true,
      commissionAmount: true,
    },
    _count: { id: true }
  });

  // 2. Total de Parceiros
  const totalPartners = await prisma.user.count({
    where: { role: "PARTNER" }
  });

  // 3. Ranking de Parceiros (Top 5 por comissão gerada)
  const partnerRanking = await prisma.user.findMany({
    where: { role: "PARTNER" },
    select: {
      id: true,
      name: true,
      email: true,
      _count: { select: { sales: true } },
      sales: {
        select: { commissionAmount: true }
      }
    },
    take: 5
  });

  // Formata o ranking calculando a soma de cada um
  const formattedRanking = partnerRanking.map(user => ({
    id: user.id,
    name: user.name,
    salesCount: user._count.sales,
    totalGenerated: user.sales.reduce((acc, sale) => acc + sale.commissionAmount, 0)
  })).sort((a, b) => b.totalGenerated - a.totalGenerated);

  return Response.json({
    totalGross: globalStats._sum.grossAmount || 0,
    totalNet: globalStats._sum.netAmount || 0,
    totalPlatformProfit: (globalStats._sum.netAmount || 0) - (globalStats._sum.commissionAmount || 0),
    totalPartners,
    ranking: formattedRanking
  });
}
