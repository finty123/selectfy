"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, Copy, CheckCircle2, 
  Search, ExternalLink, Tag, Zap 
} from "lucide-react";

// Interface para tipagem básica
interface Produto {
  id: number;
  name: string;
  niche: string;
  checkoutUrl: string;
  commissionRate: number;
}

export default function PartnerProdutos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  // No futuro, este ID virá da sua sessão/contexto de usuário logado
  const userId = 882; 

  // Simulação de produtos cadastrados pelo Admin
  const produtos: Produto[] = [
    { 
      id: 1, 
      name: "Mentoria Black Diamond", 
      niche: "Finanças", 
      checkoutUrl: "https://pay.kiwify.com.br/abc123", 
      commissionRate: 50 
    },
    { 
      id: 2, 
      name: "Método Escala Digital", 
      niche: "Marketing", 
      checkoutUrl: "https://pay.kirvano.com.br/xyz456", 
      commissionRate: 40 
    },
    { 
      id: 3, 
      name: "Ebook: Liberdade Geográfica", 
      niche: "Lifestyle", 
      checkoutUrl: "https://pay.kiwify.com.br/ebook789", 
      commissionRate: 60 
    },
  ];

  const handleCopy = (baseUrl: string, id: number) => {
    // Implementação da estrutura de UTM correta conforme solicitado
    // Verifica se a URL já possui parâmetros para usar '?' ou '&'
    const separator = baseUrl.includes('?') ? '&' : '?';
    const affiliateLink = `${baseUrl}${separator}utm_source=${userId}`;
    
    navigator.clipboard.writeText(affiliateLink);
    setCopiedId(id);
    
    // Feedback visual temporário
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProdutos = produtos.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.niche.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-[#FF5C1A]" />
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">Vitrine de Operações</h2>
          </div>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Selecione uma oferta e gere seu link de rastreio</p>
        </div>

        <div className="w-full md:w-72 bg-[#141414] border border-white/5 px-4 py-3 rounded-2xl flex items-center gap-3 focus-within:border-[#FF5C1A]/50 transition-all">
          <Search size={14} className="text-zinc-600" />
          <input 
            type="text" 
            placeholder="BUSCAR PRODUTO OU NICHO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-[9px] text-white uppercase font-black tracking-widest placeholder:text-zinc-700" 
          />
        </div>
      </div>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProdutos.map((produto) => (
          <motion.div 
            key={produto.id}
            whileHover={{ y: -5 }}
            className="bg-[#141414] border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#FF5C1A]/30 transition-all shadow-2xl"
          >
            {/* THUMBNAIL AREA */}
            <div className="h-44 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 flex flex-col items-center justify-center relative">
              <ShoppingBag size={40} className="text-zinc-800 group-hover:text-[#FF5C1A]/20 transition-colors" />
              <div className="absolute top-4 right-4 bg-[#FF5C1A]/10 border border-[#FF5C1A]/20 text-[#FF5C1A] text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {produto.commissionRate}% Comissão
              </div>
            </div>
            
            {/* CONTENT AREA */}
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={10} className="text-zinc-600" />
                  <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest">{produto.niche}</span>
                </div>
                <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">{produto.name}</h3>
              </div>

              {/* LINK GENERATOR */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Link de Afiliado (UTM)</p>
                  <a href={produto.checkoutUrl} target="_blank" className="text-zinc-600 hover:text-white transition-colors">
                    <ExternalLink size={12} />
                  </a>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-3.5 text-[9px] font-mono text-[#FF5C1A] truncate select-none">
                    {produto.checkoutUrl.split('//')[1]}...utm_source={userId}
                  </div>
                  <button 
                    onClick={() => handleCopy(produto.checkoutUrl, produto.id)}
                    className={`px-4 rounded-xl transition-all flex items-center justify-center ${
                      copiedId === produto.id 
                        ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                        : 'bg-white text-black hover:bg-[#FF5C1A] hover:text-white'
                    }`}
                  >
                    {copiedId === produto.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* FOOTER INFO */}
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[7px] text-zinc-600 font-black uppercase">Payout Médio</span>
                  <span className="text-[10px] text-white font-black italic">R$ {(97 * produto.commissionRate / 100).toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[7px] text-zinc-600 font-black uppercase">Cookie Duration</span>
                  <span className="text-[10px] text-white font-black italic tracking-tighter">Eterno</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProdutos.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center opacity-30">
          <ShoppingBag size={48} className="mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">Nenhum produto disponível no momento</p>
        </div>
      )}
    </motion.div>
  );
}