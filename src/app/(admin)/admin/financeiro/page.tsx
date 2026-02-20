"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, X, AlertCircle, Wallet, ArrowUpRight, 
  ArrowDownLeft, Landmark, History, Search, 
  Filter, Ban, Receipt
} from "lucide-react";

export default function AdminFinance() {
  const [activeTab, setActiveTab] = useState("saques");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      
      {/* KPI CARDS - VISÃO GERAL DE CAIXA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl relative overflow-hidden">
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Pendente para Saque</p>
          <h2 className="text-3xl font-black text-white tracking-tighter">R$ 142.500,00</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[8px] font-black bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">24 SOLICITAÇÕES</span>
          </div>
          <Landmark className="absolute -right-4 -bottom-4 text-white/5" size={100} />
        </div>

        <div className="bg-[#141414] border border-[#FF5C1A]/20 p-6 rounded-3xl relative overflow-hidden">
          <p className="text-[9px] font-black text-[#FF5C1A] uppercase tracking-widest mb-2">Lucro Líquido (Taxas)</p>
          <h2 className="text-3xl font-black text-white tracking-tighter">R$ 38.920,50</h2>
          <div className="mt-4 flex items-center gap-2 text-green-500">
            <ArrowUpRight size={14} />
            <span className="text-[8px] font-black uppercase">+15.4% ESTE MÊS</span>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl">
          <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Volume Total Processado</p>
          <h2 className="text-3xl font-black text-white tracking-tighter">R$ 1.290.000,00</h2>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[8px] font-black bg-white/5 text-zinc-400 px-2 py-1 rounded uppercase tracking-tighter">Acumulado Geral</span>
          </div>
        </div>
      </div>

      {/* CONTROLES DE NAVEGAÇÃO FINANCEIRA */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#141414] p-2 rounded-2xl border border-white/5">
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab("saques")}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === "saques" ? "bg-[#FF5C1A] text-black" : "text-zinc-500 hover:text-white"}`}
          >
            Pedidos de Saque
          </button>
          <button 
            onClick={() => setActiveTab("transacoes")}
            className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === "transacoes" ? "bg-[#FF5C1A] text-black" : "text-zinc-500 hover:text-white"}`}
          >
            Histórico Global
          </button>
        </div>
        
        <div className="flex items-center gap-3 px-4 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0">
          <Search size={16} className="text-zinc-600" />
          <input type="text" placeholder="FILTRAR POR PIX OU ID..." className="bg-transparent outline-none text-[9px] font-black uppercase w-full text-white" />
        </div>
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <div className="space-y-4">
        {activeTab === "saques" ? (
          // LISTA DE SAQUES PENDENTES
          <div className="grid grid-cols-1 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-[24px] flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-[#FF5C1A]/30 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]">
                    <ArrowDownLeft size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-black uppercase text-white tracking-tight">Solicitação #SQ-{4820 + i}</p>
                      <span className="text-[7px] font-black bg-white/5 text-zinc-500 px-2 py-0.5 rounded uppercase">PIX</span>
                    </div>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase mt-0.5">Partner: Agência Mídia Pro • Chave: 12.345.678/0001-90</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Valor do Resgate</p>
                    <span className="text-2xl font-black text-white tracking-tighter">R$ 4.500,00</span>
                  </div>
                  <div className="flex gap-2">
                    <button title="Recusar Saque" className="w-12 h-12 bg-white/5 text-red-500 rounded-2xl border border-red-500/10 flex items-center justify-center hover:bg-red-500 hover:text-black transition-all group-hover:scale-105">
                      <X size={20} strokeWidth={3} />
                    </button>
                    <button title="Aprovar Pagamento" className="w-12 h-12 bg-green-500 text-black rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all shadow-[0_5px_15px_rgba(34,197,94,0.2)] group-hover:scale-105">
                      <Check size={20} strokeWidth={4} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // HISTÓRICO DE TRANSAÇÕES (FEES DA PLATAFORMA)
          <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-white/5 text-zinc-500 font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">Transação</th>
                  <th className="p-5">Valor Bruto</th>
                  <th className="p-5">Taxa Selectfy</th>
                  <th className="p-5">Data/Hora</th>
                  <th className="p-5 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-white/[0.01]">
                    <td className="p-5">
                      <p className="font-black text-white uppercase">TRX-992384{i}</p>
                      <p className="text-[8px] text-zinc-600 font-bold uppercase">Produto: Curso High Ticket</p>
                    </td>
                    <td className="p-5 font-bold text-zinc-400">R$ 1.000,00</td>
                    <td className="p-5">
                      <span className="text-[#FF5C1A] font-black">R$ 50,00</span>
                    </td>
                    <td className="p-5 text-zinc-500 font-bold">19/02/2026 - 21:30</td>
                    <td className="p-5 text-right">
                      <button className="p-2 bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-all">
                        <Receipt size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RODAPÉ INFORMATIVO */}
      <div className="flex items-center gap-2 bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-2xl">
        <AlertCircle size={16} className="text-yellow-500" />
        <p className="text-[8px] font-black text-yellow-500/80 uppercase tracking-widest">
          Atenção: Todos os saques aprovados são processados via API bancária em até 30 minutos. Verifique os dados do PIX antes de confirmar.
        </p>
      </div>

    </motion.div>
  );
}