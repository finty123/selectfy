"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, ShoppingBag, BadgeDollarSign, Wallet, Store, 
  Settings, Menu, X, ArrowUpRight, ArrowDownRight, Lock, Copy, Search, Filter, 
  Shield, User, CreditCard, LogOut
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "01/02", total: 4000 }, { name: "02/02", total: 3000 }, { name: "03/02", total: 5000 },
  { name: "04/02", total: 8500 }, { name: "05/02", total: 7000 }, { name: "06/02", total: 9000 }, { name: "07/02", total: 11000 },
];

export default function UserPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas" },
    { id: "Produtos", icon: ShoppingBag, label: "Produtos" },
    { id: "Financeiro", icon: Wallet, label: "Financeiro" },
    { id: "Marketplace", icon: Store, label: "Marketplace", locked: true },
    { id: "Configurações", icon: Settings, label: "Configurações" },
  ];

  const handleLogout = () => {
    // Adicione aqui sua lógica de limpeza de cookies/sessão
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      
      {/* SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className="bg-[#080808] border-r border-white/5 flex flex-col z-50 h-screen shrink-0"
      >
        <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && <span className="text-sm font-black tracking-tighter uppercase">SELECTFY<span className="text-[#FF5C1A]">.</span></span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded-md transition-colors mx-auto text-zinc-500">
            {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.locked && setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                activeTab === item.id ? "bg-white/5 text-[#FF5C1A]" : "text-zinc-500 hover:text-zinc-200"
              } ${item.locked ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <item.icon size={18} />
              {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>}
              {item.locked && isSidebarOpen && <Lock size={10} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* BOTÃO DESLOGAR */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Encerrar Sessão</span>}
          </button>
        </div>
      </motion.aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-black flex flex-col h-screen">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40 shrink-0">
          <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Acesso Partner</span>
            <div className="w-7 h-7 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">JD</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD */}
            {activeTab === "Dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tighter">Bem-vindo, João.</h2>
                  <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mt-1">Sua infraestrutura está operacional</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#080808] border border-white/5 p-5 rounded-xl text-white">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">Saldo Disponível</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tighter">R$ 18.420,00</h3>
                      <span className="text-green-500 font-bold text-[10px] flex items-center gap-1">+12.4% <ArrowUpRight size={12}/></span>
                    </div>
                  </div>
                  <div className="bg-[#080808] border border-white/5 p-5 rounded-xl text-white">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">Total de Vendas</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black tracking-tighter">1.248</h3>
                      <span className="text-zinc-500 font-bold text-[9px] uppercase tracking-tighter">TM: R$ 287,00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#080808] border border-white/5 p-6 rounded-xl">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-6">Receita Diária (7D)</p>
                  <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs><linearGradient id="color" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF5C1A" stopOpacity={0.1}/><stop offset="95%" stopColor="#FF5C1A" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="name" stroke="#333" fontSize={9} axisLine={false} tickLine={false} />
                        <YAxis stroke="#333" fontSize={9} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#080808', border: '1px solid #ffffff10', fontSize: '9px' }} />
                        <Area type="monotone" dataKey="total" stroke="#FF5C1A" strokeWidth={2} fill="url(#color)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-[#080808] border border-white/5 p-6 rounded-xl text-center">
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-6">Conquistas de Patente</p>
                  <div className="grid grid-cols-6 gap-2 relative z-10">
                    {['10K', '50K', '100K', '250K', '500K', '1MM'].map((level, i) => (
                      <div key={level} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded border flex items-center justify-center mb-2 ${i === 0 ? 'bg-[#FF5C1A] border-[#FF5C1A] text-black shadow-[0_0_15px_rgba(255,92,26,0.3)]' : 'bg-zinc-900 border-white/5 text-zinc-700'}`}>
                          <Shield size={16} fill={i === 0 ? "currentColor" : "none"} />
                        </div>
                        <span className={`text-[8px] font-black ${i === 0 ? 'text-white' : 'text-zinc-600'}`}>{level}</span>
                      </div>
                    ))}
                    <div className="absolute top-5 left-0 w-full h-[1px] bg-white/5 -z-10" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. VENDAS */}
            {activeTab === "Vendas" && (
              <motion.div key="vendas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Receita Líquida Total</p>
                    <p className="text-xl font-black tracking-tighter">R$ 84.500,00</p>
                  </div>
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl text-[#FF5C1A]">
                    <p className="text-[8px] font-black uppercase tracking-widest mb-1">Total de Vendas</p>
                    <p className="text-xl font-black tracking-tighter">1.248</p>
                  </div>
                </div>

                <div className="flex gap-2 bg-[#080808] p-3 border border-white/5 rounded-xl">
                   <div className="flex-1 bg-black border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 text-zinc-500 text-[10px]">
                      <Search size={12} />
                      <input type="text" placeholder="Filtrar por produto..." className="bg-transparent outline-none w-full text-white" />
                   </div>
                   <button className="bg-black border border-white/10 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase text-zinc-500 flex items-center gap-2 hover:text-white transition-colors">
                      <Filter size={12} /> Filtros
                   </button>
                </div>

                <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/5 text-zinc-500 font-black uppercase">
                      <tr><th className="p-4">Data</th><th className="p-4">Produto</th><th className="p-4">Valor Bruto</th><th className="p-4 text-[#FF5C1A]">Comissão</th><th className="p-4 text-center">Status</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {[1,2,3,4,5].map(i => (
                        <tr key={i} className="hover:bg-white/[0.01]">
                          <td className="p-4 text-zinc-500 font-mono tracking-tighter">19.02.26</td>
                          <td className="p-4 font-bold uppercase tracking-widest text-zinc-300 text-[9px]">Estrutura Private 0{i}</td>
                          <td className="p-4 text-zinc-500 font-bold tracking-tighter">R$ 297,00</td>
                          <td className="p-4 text-[#FF5C1A] font-black">R$ 148,50</td>
                          <td className="p-4 text-center"><span className="text-[8px] border border-green-500/20 text-green-500 px-2 py-0.5 rounded font-black uppercase">Aprovado</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. PRODUTOS */}
            {activeTab === "Produtos" && (
              <motion.div key="produtos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden flex">
                      <div className="w-28 bg-zinc-900 border-r border-white/5 flex items-center justify-center font-black text-zinc-800 text-[9px] uppercase">Asset Preview</div>
                      <div className="p-5 flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                           <h4 className="font-black uppercase tracking-tight text-[11px] text-zinc-200">Oferta Alpha 0{i}</h4>
                           <span className="text-[#FF5C1A] text-[9px] font-black uppercase bg-[#FF5C1A]/10 px-2 py-0.5 rounded">60% Com.</span>
                        </div>
                        <div className="flex gap-4 text-[9px] font-bold text-zinc-600 uppercase">
                           <span>Conv: <b className="text-white">8.4%</b></span>
                           <span>Receita: <b className="text-white">R$ 12.4K</b></span>
                        </div>
                        <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#FF5C1A] hover:text-black transition-all flex items-center justify-center gap-2">
                          <Copy size={12} /> Copiar Link Proprietário
                        </button>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}

            {/* 4. FINANCEIRO */}
            {activeTab === "Financeiro" && (
              <motion.div key="financeiro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Receita Líquida</p>
                    <p className="text-xl font-black tracking-tighter">R$ 84.500,00</p>
                  </div>
                  <div className="p-5 bg-[#080808] border border-[#FF5C1A]/20 rounded-xl">
                    <p className="text-[8px] font-black text-[#FF5C1A] uppercase mb-1 tracking-widest">Saldo Disponível</p>
                    <p className="text-xl font-black tracking-tighter text-[#FF5C1A]">R$ 18.420,00</p>
                  </div>
                  <div className="p-5 bg-[#080808] border border-white/5 rounded-xl text-zinc-500">
                    <p className="text-[8px] font-black uppercase mb-1 tracking-widest">Saldo Pendente</p>
                    <p className="text-xl font-black tracking-tighter">R$ 4.120,00</p>
                  </div>
                </div>

                <div className="bg-[#080808] border border-white/5 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Histórico Completo</h3>
                    <button className="bg-white text-black text-[9px] font-black px-5 py-2 rounded-lg uppercase tracking-widest hover:bg-[#FF5C1A] transition-colors">Solicitar Saque</button>
                  </div>
                  <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center p-3 hover:bg-white/[0.02] rounded-lg border-b border-white/[0.02]">
                        <div className="flex gap-3 items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 3 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                            {i === 3 ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest">{i === 3 ? 'Saída de Capital' : 'Comissão Recebida'}</p>
                            <p className="text-[8px] font-black text-zinc-600 uppercase font-mono tracking-widest">ID #8842-TRX</p>
                          </div>
                        </div>
                        <p className={`text-[11px] font-black ${i === 3 ? 'text-white' : 'text-[#FF5C1A]'}`}>
                          {i === 3 ? '- R$ 1.500,00' : '+ R$ 148,50'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. CONFIGURAÇÕES */}
            {activeTab === "Configurações" && (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl space-y-4">
                <div className="bg-[#080808] border border-white/5 rounded-2xl p-8 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]"><User size={20} /></div>
                    <div><h3 className="text-xs font-black uppercase tracking-widest">Configuração Partner</h3><p className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Dados de acesso e recebimento</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1"><label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Nome</label><input type="text" defaultValue="João Silva" className="w-full bg-black border border-white/10 p-3 rounded-xl text-[10px] font-bold text-white outline-none focus:border-[#FF5C1A]/30" /></div>
                    <div className="space-y-1"><label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">E-mail</label><input type="text" defaultValue="joao@selectfy.com" className="w-full bg-black border border-white/10 p-3 rounded-xl text-[10px] font-bold text-white outline-none focus:border-[#FF5C1A]/30" /></div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Chave PIX</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-700" size={14}/>
                      <input type="text" placeholder="CPF, E-mail ou Telefone" className="w-full bg-black border border-white/10 p-3 pl-10 rounded-xl text-[10px] font-bold text-white outline-none focus:border-[#FF5C1A]/30" />
                    </div>
                  </div>
                  <button className="w-full py-3 bg-[#FF5C1A] text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-[#e55317] transition-all">Salvar Alterações</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}