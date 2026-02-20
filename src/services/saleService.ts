import { prisma } from "@/lib/prisma";

export const SalesService = {
  async processSale(data: any, platformName: string) {
    try {
      // 1. Identificar o ID do Parceiro via utm_source
      // Buscamos nos locais onde as plataformas costumam injetar parâmetros de rastreio
      const partnerId = parseInt(
        data.tracking_parameters?.utm_source || 
        data.utm_source || 
        data.custom_parameters?.utm_source ||
        data.metadata?.utm_source
      );

      const externalId = String(data.order_id || data.transaction_id || data.id);
      
      // Captura o status da venda vindo do Webhook (padrão Kiwify/Kirvano)
      const rawStatus = data.order_status || data.status || "pending";
      // Mapeamento simples para o seu banco: paid, pending, refunded, refused
      const saleStatus = rawStatus.toLowerCase();

      if (!partnerId || isNaN(partnerId)) {
        console.warn(`[Webhook] Venda ${externalId} ignorada: utm_source inválido ou ausente.`);
        return { message: "Ignorado: Sem rastreio utm_source" };
      }

      // 2. Buscar o parceiro
      const user = await prisma.user.findUnique({
        where: { id: partnerId },
      });

      if (!user) {
        console.error(`[Webhook] Usuário ${partnerId} não encontrado.`);
        return { error: "Parceiro não encontrado" };
      }

      // 3. CAPTURAR A COMISSÃO LÍQUIDA DA PLATAFORMA
      const platformCommission = parseFloat(
        data.commissions?.vendedor_amount || 
        data.commission_value || 
        0
      );

      // 4. CÁLCULO DO PAYOUT
      const partnerGain = platformCommission * (user.commissionPercentage / 100);

      // 5. TRANSAÇÃO ATÔMICA
      return await prisma.$transaction(async (tx) => {
        const existingSale = await tx.sale.findUnique({ 
          where: { externalId } 
        });
        
        // Se a venda já existe, atualizamos apenas o status (caso mude de pending para paid)
        if (existingSale) {
          if (existingSale.status !== saleStatus) {
            const updatedSale = await tx.sale.update({
              where: { externalId },
              data: { status: saleStatus }
            });

            // Se mudou para pago agora, incrementa o saldo que antes não tinha sido mexido
            if (saleStatus === "paid" && existingSale.status !== "paid") {
              await tx.user.update({
                where: { id: user.id },
                data: { balance: { increment: partnerGain } }
              });
            }
            return updatedSale;
          }
          return existingSale;
        }

        // Criar registro da nova venda com o campo status
        const sale = await tx.sale.create({
          data: {
            externalId: externalId,
            userId: user.id,
            productId: data.product_id ? parseInt(data.product_id) : 1,
            grossAmount: parseFloat(data.amount || data.total_price || 0),
            netAmount: platformCommission,
            commissionAmount: partnerGain,
            platform: platformName,
            status: saleStatus, // Novo campo sincronizado
          },
        });

        // Só incrementa o saldo se a venda entrar como aprovada (pago)
        if (saleStatus === "paid" || saleStatus === "approved") {
          await tx.user.update({
            where: { id: user.id },
            data: {
              balance: { increment: partnerGain },
            },
          });
        }

        return sale;
      });

    } catch (error) {
      console.error("Erro crítico no SalesService:", error);
      throw error;
    }
  }
};