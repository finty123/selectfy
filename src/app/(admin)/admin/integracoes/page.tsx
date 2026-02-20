"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link2, ShieldCheck, Copy, Zap, CheckCircle2 } from "lucide-react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// Se o erro persistir com o de cima, use este caminho exato:
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs/dist/index';
export default function IntegrationsPage() {
  const supabase = createClientComponentClient();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Carregar integrações reais do banco de dados
  useEffect(() => {
    fetchIntegrations();
  }, []);

  async function fetchIntegrations() {
    const { data } = await supabase
      .from('integrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setIntegrations(data);
  }

  // 2. Lógica para gerar e salvar no Supabase
  const handleGenerate = async (service: string) => {
    setLoading(true);
    try {
      const token = crypto.randomUUID();
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const finalUrl = `${baseUrl}/api/webhooks/${service.toLowerCase()}?token=${token}`;

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("Não autenticado");

      const { error } = await supabase.from('integrations').insert([
        {
          user_id: userData.user.id,
          service_name: service,
          webhook_url: finalUrl,
          webhook_token: token,
        }
      ]);

      if (error) throw error;
      fetchIntegrations();
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 p-4">
      {/* Header Estilizado */}
      <div className="bg-[#141414] p-8 rounded-[32px] border border-white/5">
        <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Gateways & Webhooks</h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Conecte o motor da Selectfy ao mundo externo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Opções de Gerar Novo Webhook */}
        {['Stripe', 'Kiwify', 'Kirvano'].map((service) => (
          <div key={service} className="bg-[#141414] border border-white/5 rounded-[32px] p-6 hover:border-[#FF5C1A]/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5">
                  <Zap size={20} className="text-[#FF5C1A]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-tighter">{service}</h3>
                  <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-zinc-500/10 text-zinc-500">
                    Pronto para conectar
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleGenerate(service)}
                disabled={loading}
                className="px-4 py-2 bg-[#FF5C1A] text-black text-[10px] font-black uppercase rounded-xl hover:bg-[#ff7a45] transition-colors disabled:opacity-50"
              >
                {loading ? "Gerando..." : "Ativar Webhook"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lista de Webhooks Ativos no Banco */}
      {integrations.length > 0 && (
        <div className="mt-12 space-y-4">
          <h3 className="text-[12px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-2">Webhooks Ativos</h3>
          <div className="grid grid-cols-1 gap-4">
            {integrations.map((it) => (
              <div key={it.id} className="bg-[#0D0D0D] border border-white/5 rounded-[24px] p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <div>
                      <p className="text-[10px] font-black text-white uppercase">{it.service_name}</p>
                      <p className="text-[9px] font-mono text-zinc-500 truncate max-w-[200px] md:max-w-md">{it.webhook_url}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(it.webhook_url, it.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold text-white hover:bg-white/10 transition-all"
                  >
                    <Copy size={14} className={copiedId === it.id ? "text-green-500" : ""} />
                    {copiedId === it.id ? "COPIADO" : "COPIAR URL"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-zinc-600 justify-center">
        <ShieldCheck size={14} />
        <span className="text-[8px] font-bold uppercase tracking-widest">Criptografia SHA-256 e Webhook dinâmico ativos</span>
      </div>
    </motion.div>
  );
}