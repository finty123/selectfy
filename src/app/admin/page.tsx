"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BadgeDollarSign, Wallet, Store, 
  Settings, Menu, X, Search, Filter, 
  User, LogOut, Users, Plus, CheckCircle2, 
  CreditCard, Shield, MoreHorizontal
} from "lucide-react";

export default function AdminPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas" },
    { id: "Parceiros", icon: Users, label: "Parceiros" },
    { id: "Marketplace", icon: Store, label: "Marketplace" },
    { id: "Financeiro", icon: Wallet, label: "Financeiro" },
    { id: "Configurações", icon: Settings, label: "Configurações" },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="bg-[#080808] border-r border-white/5 flex flex-col z-50 h-screen shrink-0"
      >
        <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && (
            <span className="text-sm font-black tracking-tighter uppercase">
              SELECTFY<span className="text-[#FF5C1A]">.</span>
              <span className="text-[10px] ml-1 opacity-50 font-black tracking-widest">ADM</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded-md transition-colors mx-auto text-zinc-500">
            {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                activeTab === item.id ? "bg-white/5 text-[#FF5C1A]" : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <item.icon size={18} />
              {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
              {activeTab === item.id && (
                <motion.div layoutId="active" className="absolute left-0 w-1 h-6 bg-[#FF5C1A] rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sair do Painel</span>}
          </button>
        </div>
      </motion.aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-black flex flex-col h-screen">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40 shrink-0">
          <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">{activeTab} Admin</h1>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-2 text-right">
              <span className="text-[9px] font-black uppercase text-white tracking-widest">Admin Master</span>
              <span className="text-[7px] font-bold uppercase text-[#FF5C1A] tracking-tighter">Sessão Ativa</span>
            </div>
            <div className="w-8 h-8 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">AD</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD */}
            {activeTab === "Dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: "Receita Operação", val: "R$ 1.84M", sub: "Total Bruto" },
                    { label: "Total Vendas", val: "14.280", sub: "Volume Geral" },
                    { label: "Lucro Empresa", val: "R$ 420K", sub: "Líquido ADM" },
                    { label: "Comissão Paga", val: "R$ 1.38M", sub: "Aos Parceiros" }
                  ].map((kpi, i) => (
                    <div key={i} className="bg-[#080808] border border-white/5 p-5 rounded-xl">
                      <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                      <h3 className="text-xl font-black tracking-tighter">{kpi.val}</h3>
                      <p className="text-[8px] text-zinc-600 font-bold uppercase mt-1">{kpi.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Ranking Top Parceiros</h3>
                  </div>
                  <table className="w-full text-left text-[10px]">
                    <thead className="text-zinc-500 font-black uppercase border-b border-white/5">
                      <tr><th className="p-4">Nome</th><th className="p-4">Receita</th><th className="p-4">Comissão</th><th className="p-4 text-right">Crescimento</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {[1,2,3].map(i => (
                        <tr key={i} className="hover:bg-white/[0.01]">
                          <td className="p-4 font-bold uppercase text-zinc-200 tracking-tighter">Parceiro Influencer 0{i}</td>
                          <td className="p-4 font-mono text-zinc-400 font-bold">R$ 142.500,00</td>
                          <td className="p-4 font-black text-[#FF5C1A]">R$ 42.750,00</td>
                          <td className="p-4 text-green-500 font-black text-right">+18.5%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 2. VENDAS */}
            {activeTab === "Vendas" && (
              <motion.div key="vendas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Total Faturado</p>
                    <p className="text-xl font-black tracking-tighter">R$ 1.842.500,00</p>
                  </div>
                  <div className="p-5 bg-[#080808] border border-[#FF5C1A]/30 rounded-xl">
                    <p className="text-[8px] font-black text-[#FF5C1A] uppercase mb-1">Lucro Empresa (Líquido)</p>
                    <p className="text-xl font-black tracking-tighter text-[#FF5C1A]">R$ 420.120,00</p>
                  </div>
                </div>
                <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/5 text-zinc-500 font-black uppercase text-[8px]">
                      <tr><th className="p-4">Parceiro</th><th className="p-4">Produto</th><th className="p-4">Valor Total</th><th className="p-4 text-[#FF5C1A]">Lucro ADM</th><th className="p-4 text-center">Status</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {[1,2,3,4,5].map(i => (
                        <tr key={i} className="hover:bg-white/[0.01]">
                          <td className="p-4 font-bold text-zinc-300 uppercase">Parceiro {i}</td>
                          <td className="p-4 text-zinc-500 uppercase font-bold">Oferta Premium</td>
                          <td className="p-4 font-mono font-bold">R$ 297,00</td>
                          <td className="p-4 text-[#FF5C1A] font-black">R$ 44,50</td>
                          <td className="p-4 text-center"><span className="text-[8px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded font-black uppercase">Aprovada</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. PARCEIROS (MELHORADO) */}
            {activeTab === "Parceiros" && (
              <motion.div key="parceiros" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h2 className="text-xl font-black tracking-tighter uppercase">Gestão de Parceiros</h2>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Controle de acessos e indicadores individuais</p>
                  </div>
                  <button className="bg-[#FF5C1A] text-black px-5 py-2.5 rounded font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all">
                    <Plus size={14} strokeWidth={3} /> Novo Parceiro
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <input 
                      type="text" 
                      placeholder="PESQUISAR PARCEIRO..." 
                      className="w-full bg-[#080808] border border-white/5 rounded pl-10 pr-4 py-2.5 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-[#FF5C1A]/40 transition-all"
                    />
                  </div>
                  <div className="bg-[#080808] border border-white/5 rounded px-4 py-2 flex items-center justify-between">
                    <span className="text-[9px] font-black text-zinc-500 uppercase">Filtros</span>
                    <Filter size={14} className="text-zinc-600" />
                  </div>
                </div>

                <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/[0.02] text-zinc-500 font-black uppercase text-[8px] border-b border-white/5">
                      <tr>
                        <th className="p-4">Parceiro</th>
                        <th className="p-4">Volume Faturado</th>
                        <th className="p-4 text-[#FF5C1A]">Comissão Acumulada</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Gerenciar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {[
                        { name: "Carlos Andrade", mail: "carlos@partner.com", vol: "R$ 54.200", com: "R$ 8.130", status: "Ativo" },
                        { name: "Beatriz Silva", mail: "beatriz.influ@media.com", vol: "R$ 122.900", com: "R$ 18.435", status: "Ativo" },
                        { name: "Agência Up", mail: "contato@agenciaup.co", vol: "R$ 8.400", com: "R$ 1.260", status: "Pendente" },
                      ].map((p, i) => (
                        <tr key={i} className="hover:bg-white/[0.01] transition-all group">
                          <td className="p-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-black border border-white/10 flex items-center justify-center text-[#FF5C1A] font-black group-hover:border-[#FF5C1A]/40 transition-all">{p.name.charAt(0)}</div>
                            <div className="flex flex-col">
                              <span className="font-black uppercase text-zinc-200 tracking-tight">{p.name}</span>
                              <span className="text-[8px] text-zinc-600 font-bold uppercase">{p.mail}</span>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-zinc-400">{p.vol}</td>
                          <td className="p-4 font-black text-[#FF5C1A] font-mono">{p.com}</td>
                          <td className="p-4">
                            <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase ${
                              p.status === "Ativo" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="text-zinc-600 hover:text-white transition-colors">
                              <MoreHorizontal size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 4. MARKETPLACE */}
            {activeTab === "Marketplace" && (
              <motion.div key="market" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="flex justify-between items-end">
                   <h2 className="text-xl font-black tracking-tighter uppercase">Marketplace</h2>
                   <button className="bg-[#FF5C1A] text-black px-4 py-2 rounded font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><Plus size={14} /> Criar Oferta</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[1, 2].map(i => (
                     <div key={i} className="bg-[#080808] border border-white/5 rounded-xl p-5 space-y-4">
                        <div className="flex justify-between items-start">
                           <h4 className="font-black uppercase tracking-widest text-xs">Produto Exclusivo #0{i}</h4>
                           <span className="bg-[#FF5C1A]/10 text-[#FF5C1A] text-[8px] px-2 py-1 rounded font-black uppercase tracking-widest border border-[#FF5C1A]/20">60% Comissão</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-4">
                           <div><p className="text-[7px] text-zinc-600 uppercase font-black">Vendas</p><p className="text-xs font-black">1.240</p></div>
                           <div><p className="text-[7px] text-zinc-600 uppercase font-black">Parceiros</p><p className="text-xs font-black">42</p></div>
                           <div><p className="text-[7px] text-zinc-600 uppercase font-black">Status</p><p className="text-xs font-black text-green-500 uppercase">Ativo</p></div>
                        </div>
                        <div className="flex gap-2">
                           <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded font-black text-[9px] uppercase hover:bg-white/10 transition-all">Editar</button>
                           <button className="flex-1 py-2 bg-white/5 border border-white/10 rounded font-black text-[9px] uppercase hover:bg-white/10 transition-all">Relatórios</button>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 5. FINANCEIRO */}
            {activeTab === "Financeiro" && (
              <motion.div key="fin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl"><p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Total Solicitado</p><p className="text-xl font-black tracking-tighter">R$ 84.500</p></div>
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl"><p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Total Pago</p><p className="text-xl font-black tracking-tighter text-green-500">R$ 1.2M</p></div>
                  <div className="p-5 bg-[#080808] border border-[#FF5C1A]/20 rounded-xl"><p className="text-[8px] font-black text-[#FF5C1A] uppercase mb-1">Pendente ADM</p><p className="text-xl font-black tracking-tighter text-[#FF5C1A]">R$ 18.4K</p></div>
                </div>
                <div className="bg-[#080808] border border-white/5 rounded-xl">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center"><h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Solicitações de Saque</h3></div>
                  <div className="divide-y divide-white/[0.03]">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="w-9 h-9 rounded bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500"><CreditCard size={14} /></div>
                          <div><p className="text-[10px] font-black uppercase">Parceiro {i}</p><p className="text-[8px] font-mono text-zinc-600 uppercase font-bold">19/02/2026</p></div>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="text-sm font-black">R$ 15.000,00</p>
                          <div className="flex gap-2">
                             <button className="w-8 h-8 rounded border border-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all"><CheckCircle2 size={14} /></button>
                             <button className="w-8 h-8 rounded border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"><X size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 6. CONFIGURAÇÕES */}
            {activeTab === "Configurações" && (
              <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="bg-[#080808] border border-white/5 rounded-xl p-8 max-w-2xl">
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]"><Shield size={24} /></div>
                      <div><h3 className="font-black uppercase tracking-widest">Painel de Controle Master</h3><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Configurações globais do sistema</p></div>
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-2">
                         <label className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Taxa de Intermediação (%)</label>
                         <input type="text" defaultValue="5.0" className="w-full bg-black border border-white/10 rounded px-4 py-2 text-sm font-mono focus:border-[#FF5C1A] outline-none transition-all font-bold" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">Taxa Fixa (R$)</label>
                         <input type="text" defaultValue="1.50" className="w-full bg-black border border-white/10 rounded px-4 py-2 text-sm font-mono focus:border-[#FF5C1A] outline-none transition-all font-bold" />
                      </div>
                      <button className="w-full bg-white text-black font-black py-3 rounded text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF5C1A] transition-all">Salvar Alterações</button>
                   </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}