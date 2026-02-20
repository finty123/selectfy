import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { service: string } }) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const service = params.service;

  const supabase = createRouteHandlerClient({ cookies });

  // 1. Validar Token no Supabase
  const { data: integration, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('webhook_token', token)
    .eq('service_name', service.toUpperCase()) // Ajuste conforme seu padrão
    .single();

  if (error || !integration) {
    return NextResponse.json({ error: 'Não autorizado ou token inválido' }, { status: 401 });
  }

  // 2. Receber o corpo da requisição (JSON do Stripe/WhatsApp/etc)
  const payload = await req.json();

  // 3. LOGICA DE NEGÓCIO: Aqui você salva o que recebeu
  // Exemplo: criar um log de eventos
  await supabase.from('webhook_logs').insert([
    { 
      integration_id: integration.id, 
      payload: payload,
      received_at: new Date() 
    }
  ]);

  return NextResponse.json({ success: true }, { status: 200 });
}