import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { service: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const service = params.service;

    // Inicializa o cliente do Supabase para rotas de API
    const supabase = createRouteHandlerClient({ cookies });

    // 1. Validar Token e Serviço no Supabase
    // .ilike é usado para ignorar maiúsculas/minúsculas no nome do serviço
    const { data: integration, error: authError } = await supabase
      .from('integrations')
      .select('*')
      .eq('webhook_token', token)
      .ilike('service_name', service) 
      .single();

    if (authError || !integration) {
      console.error('Erro de autenticação de Webhook:', authError?.message);
      return NextResponse.json({ error: 'Não autorizado ou token inválido' }, { status: 401 });
    }

    // 2. Receber o corpo da requisição (JSON do Stripe/WhatsApp/etc)
    const payload = await req.json();

    // 3. Salvar o log do recebimento
    const { error: logError } = await supabase.from('webhook_logs').insert([
      { 
        integration_id: integration.id, 
        payload: payload,
        received_at: new Date().toISOString() 
      }
    ]);

    if (logError) {
      console.error('Erro ao salvar log do webhook:', logError.message);
      // Retornamos 200 mesmo com erro no log para não forçar o Stripe a reenviar (Retry) infinitamente
    }

    return NextResponse.json({ success: true, message: "Webhook processed" }, { status: 200 });

  } catch (err) {
    console.error('Erro interno no Webhook:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}