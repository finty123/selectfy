import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { service: string } }) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const service = params.service; // Pega o nome da pasta [service]

    const supabase = createRouteHandlerClient({ cookies });

    const { data: integration, error: authError } = await supabase
      .from('integrations')
      .select('*')
      .eq('webhook_token', token)
      .ilike('service_name', service) 
      .single();

    if (authError || !integration) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const payload = await req.json();

    await supabase.from('webhook_logs').insert([
      { 
        integration_id: integration.id, 
        payload: payload,
        received_at: new Date().toISOString() 
      }
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}