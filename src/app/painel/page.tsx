"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, ShoppingBag, BadgeDollarSign, Wallet, Store, 
  Settings, Menu, X, ArrowUpRight, ArrowDownRight, Lock, Copy, Search, Filter, 
  Shield, User, CreditCard, LogOut, Package, ExternalLink, Info, CheckCircle2
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "01/02", total: 4000 }, { name: "02/02", total: 3000 }, { name: "03/02", total: 5000 },
  { name: "04/02", total: 8500 }, { name: "05/02", total: 7000 }, { name: "06/02", total: 9000 }, { name: "07/02", total: 11000 },
];

export default function UserPanel() {
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0D0D0D]" />;

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas" },
    { id: "Produtos", icon: ShoppingBag, label: "Produtos" },
    { id: "Financeiro", icon: Wallet, label: "Financeiro" },
    { id: "Marketplace", icon: Store, label: "Market", locked: true },
    { id: "Configurações", icon: Settings, label: "Ajustes" },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden font-sans antialiased">
      
      {/* SIDEBAR */}
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
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:text-red-500 transition-all group">
              <LogOut size={18} />
              {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sair</span>}
            </button>
          </div>
        </motion.aside>
      )}

      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] flex flex-col h-screen relative">
        <header className="h-16 border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md -webkit-backdrop-blur-md z-40 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">{activeTab}</h1>
            {!isMobile && <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest italic">Acesso Autorizado</span>}
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-white uppercase">João Silva</p>
                <p className="text-[7px] font-bold text-zinc-600 uppercase">Partner</p>
             </div>
             <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">JS</div>
          </div>
        </header>

        <div className={`p-4 md:p-8 max-w-6xl mx-auto w-full ${isMobile ? "pb-32" : "pb-8"}`}>
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD - COMPLETO */}
            {activeTab === "Dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FF5C1A] opacity-50" />
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-3">Saldo Total</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter text-white">R$ 18.420,00</h3>
                      <ArrowUpRight size={14} className="text-green-500" />
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-3">Total Vendas</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl md:text-2xl font-black tracking-tighter text-white">1.248</h3>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase">Aprovadas</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-6">Gráfico de Performance (7 Dias)</p>
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

                <div className="bg-[#141414] border border-white/5 p-6 rounded-2xl">
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-6 text-center">Nível de Patente</p>
                  <div className="flex justify-between items-center max-w-md mx-auto relative">
                    <div className="absolute h-[1px] bg-white/5 w-full top-5 z-0" />
                    {['10K', '50K', '100K', '250K', '500K'].map((level, i) => (
                      <div key={level} className="flex flex-col items-center z-10">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-2 transition-all ${i === 0 ? 'bg-[#FF5C1A] border-[#FF5C1A] text-black shadow-[0_0_20px_rgba(255,92,26,0.3)]' : 'bg-[#0D0D0D] border-white/5 text-zinc-800'}`}>
                          <Shield size={16} fill={i === 0 ? "currentColor" : "none"} />
                        </div>
                        <span className={`text-[8px] font-black ${i === 0 ? 'text-[#FF5C1A]' : 'text-zinc-700'}`}>{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. VENDAS - COMPLETO COM RESUMO E LISTA */}
            {activeTab === "Vendas" && (
              <motion.div key="vendas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   <div className="bg-[#141414] border border-white/5 p-4 rounded-xl">
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Vendas Totais</p>
                      <p className="text-lg font-black text-white">1.248</p>
                   </div>
                   <div className="bg-[#141414] border border-white/5 p-4 rounded-xl">
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Valor Bruto</p>
                      <p className="text-lg font-black text-white">R$ 42.150,00</p>
                   </div>
                   <div className="bg-[#141414] border border-white/5 p-4 rounded-xl">
                      <p className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Sua Comissão</p>
                      <p className="text-lg font-black text-[#FF5C1A]">R$ 18.420,00</p>
                   </div>
                </div>

                <div className="flex gap-2 bg-[#141414] p-3 border border-white/5 rounded-xl">
                    <div className="flex-1 bg-[#0D0D0D] border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2 text-zinc-500 text-[10px]">
                       <Search size={14} />
                       <input type="text" placeholder="Pesquisar venda ou ID..." className="bg-transparent outline-none w-full text-white" />
                    </div>
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                   <table className="w-full text-left text-[10px]">
                      <thead className="bg-white/5 text-zinc-500 font-black uppercase">
                        <tr>
                          <th className="p-4">Produto</th>
                          <th className="p-4 hidden md:table-cell">Data</th>
                          <th className="p-4">Comissão</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.03]">
                        {[1,2,3,4,5,6].map(i => (
                          <tr key={i} className="hover:bg-white/[0.01]">
                            <td className="p-4">
                              <p className="font-bold uppercase text-zinc-300">Estrutura Private 0{i}</p>
                              <p className="text-[8px] text-zinc-600 md:hidden">19.02.26</p>
                            </td>
                            <td className="p-4 text-zinc-500 font-mono hidden md:table-cell">19.02.2026</td>
                            <td className="p-4 text-[#FF5C1A] font-black">R$ 148,50</td>
                            <td className="p-4 text-center">
                              <span className="text-[7px] border border-green-500/20 text-green-500 px-2 py-0.5 rounded font-black uppercase">Aprovado</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                   </table>
                </div>
              </motion.div>
            )}

            {/* 3. PRODUTOS - AGORA COMPLETO */}
            {activeTab === "Produtos" && (
              <motion.div key="produtos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-xs font-black uppercase tracking-widest">Meus Produtos & Afiliações</h2>
                  <button className="bg-[#FF5C1A] text-black text-[9px] font-black px-4 py-2 rounded-lg uppercase tracking-widest flex items-center gap-2">
                    <ShoppingBag size={14} /> Solicitar Nova Afiliação
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#141414] border border-white/5 rounded-2xl p-5 group flex flex-col sm:flex-row gap-4">
                      <div className="w-20 h-20 bg-[#0D0D0D] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                        <Package size={30} className="text-zinc-800" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[11px] font-black uppercase">Método Escala Digital 0{i}</h4>
                          <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase">Ativo</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <p className="text-[7px] text-zinc-600 uppercase font-bold">Comissão</p>
                            <p className="text-xs font-black text-[#FF5C1A]">60% (R$ 148,50)</p>
                          </div>
                          <div>
                            <p className="text-[7px] text-zinc-600 uppercase font-bold">Vendas</p>
                            <p className="text-xs font-black text-white">342 un.</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 bg-white/5 hover:bg-white/10 p-2 rounded-lg text-[8px] font-black uppercase flex items-center justify-center gap-1 transition-all">
                            <Copy size={12} /> Link de Venda
                          </button>
                          <button className="w-10 bg-white/5 hover:bg-white/10 p-2 rounded-lg flex items-center justify-center transition-all">
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. FINANCEIRO - COMPLETO */}
            {activeTab === "Financeiro" && (
              <motion.div key="fin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-gradient-to-br from-[#FF5C1A] to-[#ff8c5a] p-8 rounded-3xl text-black relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-20"><Wallet size={80} /></div>
                   <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Saldo Disponível para Saque</p>
                   <h2 className="text-5xl font-black tracking-tighter mb-8">R$ 18.420,00</h2>
                   <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-4 bg-black text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-transform">Solicitar Resgate</button>
                    <button className="py-4 px-8 bg-black/10 border border-black/10 rounded-2xl font-black text-[10px] uppercase tracking-widest">Ver Histórico</button>
                   </div>
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
                   <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-6">Últimas Movimentações</p>
                   <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><ArrowUpRight size={16}/></div>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-tight">Comissão Recebida #992{i}</p>
                              <p className="text-[8px] text-zinc-600 uppercase font-bold italic">Processado via PIX</p>
                            </div>
                         </div>
                         <div className="text-right">
                           <p className="text-[11px] font-black text-white">+ R$ 148,50</p>
                           <p className="text-[7px] text-zinc-600 font-bold uppercase">18/02/2026</p>
                         </div>
                      </div>
                    ))}
                   </div>
                </div>
              </motion.div>
            )}

            {/* 5. CONFIGURAÇÕES - COMPLETO */}
            {activeTab === "Configurações" && (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
                 <div className="bg-[#141414] border border-white/5 p-8 rounded-3xl space-y-8">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-2xl bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A] border border-[#FF5C1A]/20">
                         <User size={32}/>
                       </div>
                       <div>
                         <h4 className="font-black uppercase text-sm tracking-widest">João Silva</h4>
                         <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-[0.2em] mt-1 flex items-center gap-2">
                           <Shield size={10} className="text-[#FF5C1A]" /> Membro Selectfy Partner
                         </p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Nome Completo</label>
                          <input type="text" defaultValue="João Silva dos Santos" className="w-full bg-[#0D0D0D] border border-white/5 p-4 rounded-xl text-[10px] outline-none focus:border-[#FF5C1A]/50 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">E-mail</label>
                          <input type="text" defaultValue="joao@selectfy.com" className="w-full bg-[#0D0D0D] border border-white/5 p-4 rounded-xl text-[10px] outline-none opacity-50 cursor-not-allowed" readOnly />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Chave PIX</label>
                          <input type="text" placeholder="CPF, E-mail ou Aleatória" className="w-full bg-[#0D0D0D] border border-white/5 p-4 rounded-xl text-[10px] outline-none focus:border-[#FF5C1A]/50 transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[8px] font-black text-zinc-600 uppercase ml-2 tracking-widest">Telefone/WhatsApp</label>
                          <input type="text" defaultValue="(11) 99999-9999" className="w-full bg-[#0D0D0D] border border-white/5 p-4 rounded-xl text-[10px] outline-none focus:border-[#FF5C1A]/50 transition-all" />
                       </div>
                    </div>

                    <div className="bg-[#0D0D0D] p-6 rounded-2xl border border-white/5 space-y-4">
                      <div className="flex items-center gap-3">
                        <Lock size={16} className="text-zinc-500" />
                        <h5 className="text-[9px] font-black uppercase tracking-widest">Segurança da Conta</h5>
                      </div>
                      <button className="w-full py-3 bg-white/5 hover:bg-white/10 transition-all rounded-xl font-black text-[9px] uppercase tracking-widest border border-white/10">Alterar Senha de Acesso</button>
                    </div>

                    <button className="w-full py-4 bg-[#FF5C1A] text-black hover:bg-[#ff733b] transition-all rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#FF5C1A]/10">
                      Salvar Todas as Alterações
                    </button>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* NAVEGAÇÃO MOBILE (ESTILO IOS/ANDROID APP) */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-[#141414]/90 backdrop-blur-xl -webkit-backdrop-blur-xl border-t border-white/5 px-4 py-4 flex justify-around items-center z-50 pb-safe">
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
                  className={`p-2 rounded-xl transition-colors ${activeTab === item.id ? "bg-[#FF5C1A]/10" : ""}`}
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
        :root { --vh: 1vh; }
        body { background-color: #0D0D0D; height: 100vh; height: -webkit-fill-available; overflow: hidden; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
        .pb-safe { padding-bottom: calc(env(safe-area-inset-bottom) + 0.5rem); }
      `}</style>
    </div>
  );
}