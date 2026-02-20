"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, Download, ArrowUpRight, 
  Calendar, BadgeDollarSign, Loader2, AlertCircle
} from "lucide-react";

export default function AdminVendas() {
  const [filter, setFilter] = useState("Todas");
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Busca as vendas reais da API
  const fetchVendas = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sales"); // Criaremos esta rota a seguir
      const data = await res.json();
      setVendas(data);
    } catch (err) {
      console.error("Erro ao carregar vendas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendas();
  }, []);

  // Lógica de Filtro e Busca
  const filteredVendas = vendas.filter((sale: any) => {
    const matchesFilter = filter === "Todas" || 
      (filter === "Aprovadas" && sale.status === "paid") ||
      (filter === "Pendentes" && sale.status === "pending") ||
      (filter === "Estornadas" && sale.status === "refunded");
    
    const matchesSearch = sale.externalId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sale.user?.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Métricas de Performance Reais
  const totalVolume = vendas.reduce((acc, sale: any) => sale.status === "paid" ? acc + sale.grossAmount : acc, 0);
  const totalProfit = vendas.reduce((acc, sale: any) => sale.status === "paid" ? acc + (sale.netAmount - sale.commissionAmount) : acc, 0);
  const conversionRate = vendas.length > 0 ? (vendas.filter((s: any) => s.status === "paid").length / vendas.length) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 pb-20 md:pb-8"
    >
      {/* HEADER E FILTROS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Auditoria Global de Vendas</h2>
          <p className="text-[9px] text-zinc-500 font-bold uppercase ">Monitoramento de transações em tempo real na rede</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="flex-1 md:w-72 bg-[#141414] border border-white/5 px-4 py-3 rounded-2xl flex items-center gap-3">
            <Search size={14} className="text-zinc-600" />
            <input 
              type="text" 
              placeholder="BUSCAR ID OU PARCEIRO..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none w-full text-[9px] text-white uppercase font-black tracking-widest placeholder:text-zinc-700" 
            />
          </div>
          <button onClick={fetchVendas} className="bg-[#141414] border border-white/5 p-3 rounded-2xl text-zinc-500 hover:text-white transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* CARDS DE PERFORMANCE GLOBAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl group">
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 ">Volume Pago (Total)</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white">R$ {totalVolume.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <span className="flex items-center gap-1 text-green-500 text-[9px] font-black bg-green-500/10 px-2 py-1 rounded-lg">
              <ArrowUpRight size={12}/> LIVE
            </span>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#FF5C1A]/10 p-6 rounded-3xl group">
          <p className="text-[8px] font-black text-[#FF5C1A] uppercase tracking-widest mb-2 text-opacity-50">Lucro Selectfy (Líquido)</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white">R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
            <BadgeDollarSign size={24} className="text-[#FF5C1A] opacity-20"/>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl group">
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 ">Taxa de Conversão</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white">{conversionRate.toFixed(1)}%</h3>
            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#FF5C1A]" style={{ width: `${conversionRate}%` }}/>
            </div>
          </div>
        </div>
      </div>

      {/* TABELA DE VENDAS MASTER */}
      <div className="bg-[#141414] border border-white/5 rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full no-scrollbar">
            {['Todas', 'Aprovadas', 'Pendentes', 'Estornadas'].map((s) => (
              <button 
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === s ? 'bg-[#FF5C1A] text-black shadow-[0_5px_15px_rgba(255,92,26,0.2)]' : 'bg-white/5 text-zinc-500 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-[9px] font-black uppercase">
            <Calendar size={14}/> {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-[#FF5C1A]" size={32} />
              <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Sincronizando transações...</p>
            </div>
          ) : filteredVendas.length === 0 ? (
            <div className="p-20 flex flex-col items-center gap-4">
              <AlertCircle className="text-zinc-800" size={32} />
              <p className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Nenhuma venda encontrada</p>
            </div>
          ) : (
            <table className="w-full text-left text-[10px]">
              <thead className="bg-white/5 text-zinc-500 font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">Transação / Data</th>
                  <th className="p-5">Partner (Vendedor)</th>
                  <th className="p-5">Produto</th>
                  <th className="p-5">Comissão Líquida</th>
                  <th className="p-5 text-right">Fee ADM</th>
                  <th className="p-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filteredVendas.map((sale: any) => (
                  <tr key={sale.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="p-5">
                      <p className="font-black text-white uppercase tracking-tighter">#{sale.externalId.slice(-8)}</p>
                      <p className="text-[8px] text-zinc-600 font-bold">{new Date(sale.createdAt).toLocaleString('pt-BR')}</p>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col">
                          <span className="font-black text-zinc-300 uppercase tracking-tight">{sale.user?.name}</span>
                          <span className="text-[8px] text-[#FF5C1A] font-bold uppercase italic">Fee: {sale.user?.commissionPercentage}%</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <p className="font-black text-white uppercase text-[9px]">{sale.product?.name}</p>
                      <span className="text-[7px] text-zinc-600 font-black uppercase ">{sale.platform}</span>
                    </td>
                    <td className="p-5">
                      <p className="text-white font-black text-sm">R$ {sale.commissionAmount.toFixed(2)}</p>
                      <span className="text-[7px] text-zinc-600 font-bold uppercase ">Payout Parceiro</span>
                    </td>
                    <td className="p-5 text-right">
                      <p className="text-[#FF5C1A] font-black ">R$ {(sale.netAmount - sale.commissionAmount).toFixed(2)}</p>
                      <span className="text-[7px] text-zinc-600 font-bold uppercase ">Seu Lucro</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`inline-block text-[7px] px-3 py-1 rounded-md font-black uppercase tracking-widest ${
                        sale.status === 'paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        sale.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {sale.status === 'paid' ? 'Aprovada' : sale.status === 'pending' ? 'Pendente' : 'Recusada'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
}