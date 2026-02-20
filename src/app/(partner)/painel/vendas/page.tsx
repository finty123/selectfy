"use client";
import { Search, Filter, Download, ArrowUpRight, TrendingUp, BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function VendasPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      {/* HEADER E FILTROS RÁPIDOS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Minhas Vendas</h2>
          <p className="text-[9px] text-zinc-500 font-bold uppercase">Acompanhe seu histórico de conversões em tempo real</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:w-64 bg-[#141414] border border-white/5 px-4 py-2.5 rounded-xl flex items-center gap-3 text-zinc-500">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="BUSCAR TRANSAÇÃO..." 
              className="bg-transparent outline-none w-full text-[9px] text-white uppercase font-black tracking-widest placeholder:text-zinc-700" 
            />
          </div>
          <button className="bg-[#141414] border border-white/5 p-2.5 rounded-xl text-zinc-500 hover:text-white transition-all">
            <Filter size={18} />
          </button>
          <button className="bg-[#141414] border border-white/5 p-2.5 rounded-xl text-zinc-500 hover:text-[#FF5C1A] transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* CARDS DE PERFORMANCE (DE VOLTA E MELHORADOS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* FATURAMENTO BRUTO */}
        <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={40} />
          </div>
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 ">Faturamento Bruto</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-white tracking-tighter">R$ 32.840,00</h3>
          </div>
          <p className="text-[7px] font-bold text-zinc-600 uppercase mt-2">Valor total das vendas geradas</p>
        </div>

        {/* RECEITA LÍQUIDA */}
        <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#FF5C1A]">
            <BadgeDollarSign size={40} />
          </div>
          <p className="text-[8px] font-black text-[#FF5C1A] uppercase tracking-widest mb-2 ">Receita Líquida</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-white tracking-tighter">R$ 18.420,00</h3>
          </div>
          <p className="text-[7px] font-bold text-zinc-600 uppercase mt-2">Sua comissão real após taxas</p>
        </div>

        {/* TOTAL DE VENDAS */}
        <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ArrowUpRight size={40} />
          </div>
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 ">Total de Vendas</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-white tracking-tighter">1.248</h3>
          </div>
          <p className="text-[7px] font-bold text-green-500 uppercase mt-2">Conversões aprovadas</p>
        </div>
      </div>

      {/* TABELA DE VENDAS DETALHADA */}
      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
          <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Últimas Transações</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead className="bg-white/5 text-zinc-500 font-black uppercase ">
              <tr>
                <th className="p-4 tracking-widest">ID / Produto</th>
                <th className="p-4 tracking-widest text-center">Data</th>
                <th className="p-4 tracking-widest">Valor Bruto</th>
                <th className="p-4 tracking-widest">Sua Comissão</th>
                <th className="p-4 tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="p-4">
                    <p className="font-black text-white uppercase tracking-tighter group-hover:text-[#FF5C1A] transition-colors">#TRX-99283{i}</p>
                    <p className="text-[8px] text-zinc-500 font-bold uppercase ">Estrutura Private Premium 0{i}</p>
                  </td>
                  <td className="p-4 text-zinc-500 font-mono text-center">19/02/2026</td>
                  <td className="p-4 text-zinc-400 font-bold uppercase">R$ 297,00</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-[#FF5C1A] font-black text-sm">R$ 148,50</span>
                      <span className="text-[7px] text-zinc-600 font-black uppercase">Taxa de 60%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block text-[7px] bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-md font-black uppercase tracking-widest">
                      Aprovada
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}