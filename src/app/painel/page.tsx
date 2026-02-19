"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  // Detector de Responsividade
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas" },
    { id: "Produtos", icon: ShoppingBag, label: "Produtos" },
    { id: "Financeiro", icon: Wallet, label: "Financeiro" },
    { id: "Marketplace", icon: Store, label: "Market", locked: true },
    { id: "Configurações", icon: Settings, label: "Ajustes" },
  ];

  const handleLogout = () => {
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR (ESCONDIDA NO MOBILE) */}
      {!isMobile && (
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 240 : 80 }}
          className="bg-[#141414] border-r border-white/5 flex flex-col z-50 h-screen shrink-0"
        >
          <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">
            {isSidebarOpen && <span className="text-sm font-black tracking-tighter uppercase">SELECTFY<span className="text-[#FF5C1A]">.</span></span>}
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded-md transition-colors mx-auto text-zinc-500">
              {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.locked && setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                  activeTab === item.id ? "bg-[#FF5C1A]/10 text-[#FF5C1A]" : "text-zinc-500 hover:text-zinc-200"
                } ${item.locked ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                <item.icon size={18} />
                {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>}
                {item.locked && isSidebarOpen && <Lock size={10} className="ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group">
              <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
              {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sair</span>}
            </button>
          </div>
        </motion.aside>
      )}

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] flex flex-col h-screen relative">
        
        {/* HEADER */}
        <header className="h-16 border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md z-40 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">{activeTab}</h1>
            {!isMobile && <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">Infraestrutura Ativa</span>}
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden md:block text-right">
                <p className="text-[9px] font-black text-white uppercase tracking-tighter">João Silva</p>
                <p className="text-[7px] font-bold text-zinc-600 uppercase">Acesso Partner</p>
             </div>
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">JS</div>
          </div>
        </header>

        {/* CONTEÚDO */}
        <div className={`p-4 md:p-8 max-w-6xl mx-auto w-full ${isMobile ? "pb-28" : "pb-8"}`}>
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD */}
            {activeTab === "Dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-3">Saldo Disponível</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter text-white">R$ 18.420,00</h3>
                      <span className="text-green-500 font-bold text-[9px] flex items-center gap-1">+12.4% <ArrowUpRight size={10}/></span>
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-3">Total Vendas</p>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter text-white">1.248</h3>
                      <span className="text-zinc-500 font-bold text-[9px] uppercase">TM: R$ 287</span>
                    </div>
                  </div>
                </div>

                {/* GRÁFICO RESPONSIVO */}
                <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-6">Performance de Receita</p>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs><linearGradient id="color" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#FF5C1A" stopOpacity={0.1}/><stop offset="95%" stopColor="#FF5C1A" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="name" stroke="#333" fontSize={8} axisLine={false} tickLine={false} />
                        <YAxis stroke="#333" fontSize={8} axisLine={false} tickLine={false} hide={isMobile} />
                        <Tooltip contentStyle={{ backgroundColor: '#141414', border: '1px solid #ffffff10', fontSize: '9px', borderRadius: '10px' }} />
                        <Area type="monotone" dataKey="total" stroke="#FF5C1A" strokeWidth={2} fill="url(#color)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* PATENTES */}
                <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl text-center">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-6">Status de Patente</p>
                  <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2">
                    {['10K', '50K', '100K', '250K', '500K'].map((level, i) => (
                      <div key={level} className="flex flex-col items-center shrink-0 min-w-[60px]">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2 ${i === 0 ? 'bg-[#FF5C1A] border-[#FF5C1A] text-black' : 'bg-[#0D0D0D] border-white/5 text-zinc-800'}`}>
                          <Shield size={16} fill={i === 0 ? "currentColor" : "none"} />
                        </div>
                        <span className={`text-[8px] font-black ${i === 0 ? 'text-white' : 'text-zinc-700'}`}>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. VENDAS (RESPONSIVO COM CARDS NO MOBILE) */}
            {activeTab === "Vendas" && (
              <motion.div key="vendas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex gap-2 bg-[#141414] p-3 border border-white/5 rounded-xl">
                   <div className="flex-1 bg-[#0D0D0D] border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-zinc-500 text-[10px]">
                      <Search size={14} />
                      <input type="text" placeholder="Filtrar..." className="bg-transparent outline-none w-full text-white" />
                   </div>
                </div>

                {isMobile ? (
                  // LISTA MOBILE
                  <div className="space-y-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-white uppercase tracking-tight">Estrutura Private 0{i}</p>
                          <p className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">19.02.26 • ID #884{i}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-black text-[#FF5C1A]">R$ 148,50</p>
                          <p className="text-[7px] text-green-500 font-black uppercase tracking-tighter">Aprovado</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // TABELA DESKTOP
                  <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-[10px]">
                      <thead className="bg-white/5 text-zinc-500 font-black uppercase">
                        <tr><th className="p-4">Data</th><th className="p-4">Produto</th><th className="p-4 text-[#FF5C1A]">Comissão</th><th className="p-4 text-center">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {[1,2,3,4,5].map(i => (
                          <tr key={i} className="hover:bg-white/[0.01]">
                            <td className="p-4 text-zinc-500 font-mono">19.02.26</td>
                            <td className="p-4 font-bold uppercase text-zinc-300">Estrutura Private 0{i}</td>
                            <td className="p-4 text-[#FF5C1A] font-black">R$ 148,50</td>
                            <td className="p-4 text-center"><span className="text-[8px] border border-green-500/20 text-green-500 px-2 py-0.5 rounded font-black uppercase">Aprovado</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* FINANCEIRO */}
            {activeTab === "Financeiro" && (
              <motion.div key="fin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                 <div className="bg-gradient-to-br from-[#FF5C1A] to-[#ff8c5a] p-6 rounded-3xl text-black">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">Saldo para Saque</p>
                    <h2 className="text-4xl font-black tracking-tighter mb-6">R$ 18.420,00</h2>
                    <button className="w-full py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Solicitar Resgate</button>
                 </div>
                 <div className="bg-[#141414] border border-white/5 rounded-2xl p-5">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-4">Últimas Transações</p>
                    {[1,2].map(i => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><ArrowUpRight size={14}/></div>
                            <div><p className="text-[9px] font-black uppercase tracking-tight">Comissão #992{i}</p><p className="text-[7px] text-zinc-600 uppercase font-bold">18 de Fev</p></div>
                         </div>
                         <p className="text-[10px] font-black text-white">+ R$ 148,50</p>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* CONFIGURAÇÕES */}
            {activeTab === "Configurações" && (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-xl">
                 <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]"><User size={24}/></div>
                       <div><h4 className="font-black uppercase text-[11px] tracking-widest">João Silva</h4><p className="text-[8px] text-zinc-600 uppercase font-bold">Membro Partner Selectfy</p></div>
                    </div>
                    <div className="space-y-3">
                       <div className="space-y-1"><label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">E-mail</label><input type="text" defaultValue="joao@selectfy.com" className="w-full bg-[#0D0D0D] border border-white/5 p-3 rounded-xl text-[10px] outline-none focus:border-[#FF5C1A]/50" /></div>
                       <div className="space-y-1"><label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Chave PIX</label><input type="text" placeholder="CPF ou E-mail" className="w-full bg-[#0D0D0D] border border-white/5 p-3 rounded-xl text-[10px] outline-none focus:border-[#FF5C1A]/50" /></div>
                       <button className="w-full py-3 bg-white/5 hover:bg-[#FF5C1A] hover:text-black transition-all rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Atualizar Cadastro</button>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* NAVEGAÇÃO MOBILE (ESTILO APP) */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-[#141414]/90 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex justify-around items-center z-50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.locked && setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === item.id ? "text-[#FF5C1A]" : "text-zinc-600"
                } ${item.locked ? "opacity-20" : ""}`}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl ${activeTab === item.id ? "bg-[#FF5C1A]/10" : ""}`}
                >
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 3 : 2} />
                </motion.div>
                <span className="text-[7px] font-black uppercase tracking-[0.1em]">{item.id === "Configurações" ? "Ajustes" : item.id}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        body { background-color: #0D0D0D; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}