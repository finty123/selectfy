"use client"
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function IntegrationsSelectfy() {
  const supabase = createClientComponentClient();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Carregar integrações já existentes ao abrir a página
  useEffect(() => {
    fetchIntegrations();
  }, []);

  async function fetchIntegrations() {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erro ao buscar integrações:", error.message);
    } else {
      setIntegrations(data || []);
    }
  }

  // 2. Função para Gerar e Salvar no Banco
  const handleGenerate = async (service: string) => {
    setLoading(true);
    try {
      const token = crypto.randomUUID();
      
      // Ajuste dinâmico da URL: Detecta se está em produção ou localhost
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_APP_URL || '';

      const finalUrl = `${baseUrl}/api/webhooks/${service.toLowerCase()}?token=${token}`;

      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from('integrations').insert([
        {
          user_id: userData.user.id,
          service_name: service,
          webhook_url: finalUrl,
          webhook_token: token,
        }
      ]);

      if (error) throw error;

      await fetchIntegrations(); // Atualiza a lista na tela
    } catch (error: any) {
      alert("Erro ao salvar integração: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para copiar texto e mostrar feedback visual
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Integrações Selectfy</h1>
        <p className="text-gray-500 mt-2">Configure URLs de webhook para receber dados externos em tempo real.</p>
      </header>

      {/* Grid de Opções */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {['Stripe', 'WhatsApp', 'Shopify'].map((service) => (
          <button
            key={service}
            disabled={loading}
            onClick={() => handleGenerate(service)}
            className="group p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-center relative overflow-hidden"
          >
            <div className="bg-white shadow-sm border border-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold text-indigo-600">{service[0]}</span>
            </div>
            <span className="block font-semibold text-gray-800">Conectar {service}</span>
            <span className="text-xs text-gray-400 mt-1 block">Clique para gerar webhook</span>
          </button>
        ))}
      </div>

      {/* Lista de Webhooks Ativos */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="font-semibold text-gray-700">Seus Webhooks Ativos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase text-gray-400 font-medium border-b border-gray-100">
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">URL do Webhook</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {integrations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-400 italic">
                    Nenhuma integração configurada ainda.
                  </td>
                </tr>
              ) : (
                integrations.map((it) => (
                  <tr key={it.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {it.service_name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-[10px] md:text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded select-all truncate block max-w-xs md:max-w-md">
                        {it.webhook_url}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => copyToClipboard(it.webhook_url, it.id)}
                        className={`text-sm font-medium transition-colors ${
                          copiedId === it.id ? 'text-green-600' : 'text-indigo-600 hover:text-indigo-800'
                        }`}
                      >
                        {copiedId === it.id ? 'Copiado!' : 'Copiar URL'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}