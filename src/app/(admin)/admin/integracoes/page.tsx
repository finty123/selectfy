"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link2, Globe, ShieldCheck, Copy, CheckCircle2, Zap } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { name: "Kirvano", endpoint: "/api/webhooks/kirvano", status: "Active" },
    { name: "Kiwify", endpoint: "/api/webhooks/kiwify", status: "Active" },
    { name: "Stripe", endpoint: "/api/webhooks/stripe", status: "Setup" },
  ];

  const copyToClipboard = (path: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    alert("URL do Webhook copiada!");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="bg-[#141414] p-8 rounded-[32px] border border-white/5">
        <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Gateways & Webhooks</h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Conecte plataformas externas ao motor da Selectfy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="bg-[#141414] border border-white/5 rounded-[32px] p-6 hover:border-[#FF5C1A]/20 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5">
                  <Zap size={20} className="text-[#FF5C1A]" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-tighter">{item.name}</h3>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                    item.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard(item.endpoint)}
                className="p-3 bg-black rounded-xl border border-white/5 text-zinc-500 hover:text-[#FF5C1A] transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block ml-1">Endpoint de Escuta</label>
              <div className="w-full bg-black border border-white/5 rounded-xl p-4 text-[10px] font-mono text-zinc-400 break-all">
                {`https://api.selectfy.com${item.endpoint}`}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-zinc-600">
              <ShieldCheck size={14} />
              <span className="text-[8px] font-bold uppercase tracking-widest">Assinatura de segurança SHA-256 habilitada</span>
            </div>
          </div>
        ))}

        {/* Adicionar Nova Integração */}
        <div className="bg-[#0D0D0D] border-2 border-dashed border-white/5 rounded-[32px] p-6 flex flex-col items-center justify-center text-center group hover:border-[#FF5C1A]/20 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Link2 className="text-zinc-500" size={24} />
          </div>
          <h4 className="text-[10px] font-black uppercase text-white">Nova Integração Customizada</h4>
          <p className="text-[8px] text-zinc-600 font-bold uppercase mt-1">Conecte qualquer plataforma via JSON</p>
        </div>
      </div>
    </motion.div>
  );
}