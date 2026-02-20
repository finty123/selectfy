import { SalesService } from "@/services/saleService"; // Ajustado para o nome do seu arquivo atual
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { platform: string } }) {
  try {
    const body = await req.json();
    const platform = params.platform;

    // 1. Registra o log bruto para auditoria e segurança
    // Importante para debugar caso uma venda não seja processada
    await prisma.webhookLog.create({
      data: {
        platform: platform,
        payload: body,
      }
    });

    // 2. Processa a venda enviando o corpo e o nome da plataforma
    // O Service agora cuida de identificar o parceiro via 'src' e calcular o payout
    const result = await SalesService.processSale(body, platform);

    return NextResponse.json({ 
      received: true, 
      processed: !!result 
    }, { status: 200 });

  } catch (error) {
    console.error(`[WEBHOOK ERROR - ${params.platform}]:`, error);
    
    // Retornamos 200 mesmo no erro para evitar que a plataforma (Kiwify/etc) 
    // fique tentando reenviar o webhook infinitamente em caso de erro de lógica
    return NextResponse.json({ 
      received: true, 
      error: "Internal processing error" 
    }, { status: 200 });
  }
}