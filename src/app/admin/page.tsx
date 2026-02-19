"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BadgeDollarSign, Wallet, Store, 
  Settings, Menu, X, Search, Filter, 
  User, LogOut, Users, Plus, CheckCircle2, 
  CreditCard, Shield, MoreHorizontal, ArrowUpRight,
  Package, TrendingUp, Eye, ShoppingCart, AlertCircle
} from "lucide-react";

export default function AdminPanel() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Geral" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas" },
    { id: "Parceiros", icon: Users, label: "Partners" },
    { id: "Marketplace", icon: Store, label: "Market" },
    { id: "Financeiro", icon: Wallet, label: "Caixa" },
    { id: "Configurações", icon: Settings, label: "Adm" },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      {!isMobile && (
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 260 : 80 }}
          className="bg-[#141414] border-r border-white/5 flex flex-col z-50 h-screen shrink-0"
        >
          <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">
            {isSidebarOpen && (
              <span className="text-sm font-black tracking-tighter uppercase">
                SELECTFY<span className="text-[#FF5C1A]">.</span>
                <span className="text-[10px] ml-1 opacity-50 font-black tracking-widest text-[#FF5C1A]">ADM</span>
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
                  activeTab === item.id ? "bg-[#FF5C1A]/10 text-[#FF5C1A]" : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                <item.icon size={18} />
                {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all group">
              <LogOut size={18} />
              {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sair</span>}
            </button>
          </div>
        </motion.aside>
      )}

      {/* MAIN AREA */}
      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] flex flex-col h-screen relative">
        <header className="h-16 border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md z-40 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">{activeTab} Master</h1>
          </div>
          <div className="flex items-center gap-3">
            {!isMobile && (
              <div className="text-right mr-2">
                <p className="text-[9px] font-black uppercase text-white tracking-widest">Admin Global</p>
                <p className="text-[7px] font-bold uppercase text-green-500 tracking-tighter">Sistema Estável</p>
              </div>
            )}
            <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase font-mono">AD</div>
          </div>
        </header>

        <div className={`p-4 md:p-8 max-w-6xl mx-auto w-full ${isMobile ? "pb-28" : "pb-8"}`}>
          <AnimatePresence mode="wait">
            
            {/* 1. DASHBOARD ADM */}
            {activeTab === "Dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Receita", val: "1.8M", color: "text-white" },
                    { label: "Vendas", val: "14.2K", color: "text-white" },
                    { label: "Lucro ADM", val: "420K", color: "text-[#FF5C1A]" },
                    { label: "Partners", val: "842", color: "text-white" }
                  ].map((kpi, i) => (
                    <div key={i} className="bg-[#141414] border border-white/5 p-4 rounded-2xl">
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">{kpi.label}</p>
                      <h3 className={`text-lg md:text-xl font-black tracking-tighter ${kpi.color}`}>R$ {kpi.val}</h3>
                    </div>
                  ))}
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Ranking Top Performance</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px]">
                      <tbody className="divide-y divide-white/[0.03]">
                        {[1,2,3].map(i => (
                          <tr key={i} className="hover:bg-white/[0.01]">
                            <td className="p-4 flex items-center gap-3">
                               <div className="w-6 h-6 rounded bg-[#0D0D0D] flex items-center justify-center font-black text-[#FF5C1A] text-[8px]">{i}º</div>
                               <span className="font-bold uppercase text-zinc-200">Partner Alpha 0{i}</span>
                            </td>
                            <td className="p-4 font-mono text-zinc-500">R$ 142.500</td>
                            <td className="p-4 text-green-500 font-black text-right">+18%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. VENDAS - RESTAURADO E COMPLETO */}
            {activeTab === "Vendas" && (
              <motion.div key="vendas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {['Todas', 'Aprovadas', 'Pendentes', 'Canceladas'].map((f) => (
                      <button key={f} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest whitespace-nowrap ${f === 'Todas' ? 'bg-[#FF5C1A] text-black' : 'bg-white/5 text-zinc-500'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="bg-[#141414] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3 w-full md:w-64">
                    <Search size={14} className="text-zinc-600" />
                    <input type="text" placeholder="ID, EMAIL OU CLIENTE..." className="bg-transparent border-none outline-none text-[9px] font-bold uppercase w-full" />
                  </div>
                </div>

                <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-[10px]">
                    <thead className="bg-white/5 text-zinc-500 font-black uppercase">
                      <tr>
                        <th className="p-4">Transação</th>
                        <th className="p-4 hidden md:table-cell">Partner</th>
                        <th className="p-4">Valor</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i} className="hover:bg-white/[0.01]">
                          <td className="p-4">
                            <p className="font-black text-zinc-200 uppercase">#SLCT-990{i}</p>
                            <p className="text-[8px] text-zinc-600">19/02/2026 14:20</p>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <p className="font-bold text-zinc-400 uppercase">João Silva (Partner)</p>
                          </td>
                          <td className="p-4">
                            <p className="font-black text-white">R$ 297,00</p>
                            <p className="text-[8px] text-[#FF5C1A]">Taxa: R$ 14,85</p>
                          </td>
                          <td className="p-4">
                            <span className="bg-green-500/10 text-green-500 text-[7px] font-black px-2 py-0.5 rounded uppercase">Aprovada</span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-600"><Eye size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. PARCEIROS */}
            {activeTab === "Parceiros" && (
              <motion.div key="parceiros" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex justify-between items-center bg-[#141414] p-3 rounded-2xl border border-white/5">
                   <div className="flex items-center gap-2 text-zinc-500 px-2 flex-1">
                      <Search size={14} />
                      <input type="text" placeholder="BUSCAR PARTNER..." className="bg-transparent outline-none text-[10px] font-bold w-full uppercase" />
                   </div>
                   <button className="bg-[#FF5C1A] p-2 rounded-lg text-black"><Plus size={16} strokeWidth={3} /></button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Carlos Andrade", mail: "carlos@partner.com", vol: "R$ 54.200", status: "Ativo" },
                    { name: "Beatriz Silva", mail: "beatriz.influ@media.com", vol: "R$ 122.900", status: "Ativo" },
                    { name: "Agência Up", mail: "contato@agenciaup.co", vol: "R$ 8.400", status: "Pendente" },
                  ].map((p, i) => (
                    <div key={i} className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-[#0D0D0D] border border-white/5 flex items-center justify-center text-[#FF5C1A] font-black text-xs">{p.name.charAt(0)}</div>
                         <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-tight">{p.name}</p>
                            <p className="text-[8px] text-zinc-600 font-bold uppercase">{p.mail}</p>
                         </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-8">
                         <div className="text-left md:text-right">
                            <p className="text-[7px] font-black text-zinc-500 uppercase">Volume</p>
                            <p className="text-[11px] font-black text-white font-mono">{p.vol}</p>
                         </div>
                         <div className={`text-[8px] px-3 py-1 rounded-lg font-black uppercase ${p.status === 'Ativo' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {p.status}
                         </div>
                         <button className="text-zinc-700 hover:text-white"><MoreHorizontal size={18}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. MARKETPLACE - RESTAURADO E COMPLETO */}
            {activeTab === "Marketplace" && (
              <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Produtos Ativos</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black">42</h3>
                      <Package size={20} className="text-[#FF5C1A]" />
                    </div>
                  </div>
                  <div className="bg-[#141414] border border-white/5 p-5 rounded-2xl">
                    <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2">Novas Afiliações</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black">128</h3>
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                  </div>
                  <button className="bg-[#FF5C1A] text-black rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Plus size={18} /> Cadastrar Produto
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#141414] border border-white/5 p-4 rounded-2xl flex gap-4 items-center">
                      <div className="w-16 h-16 bg-[#0D0D0D] rounded-xl flex items-center justify-center border border-white/5 shrink-0">
                        <Store size={24} className="text-zinc-800" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex justify-between items-start">
                          <h4 className="text-[10px] font-black uppercase truncate">Curso High Stakes 0{i}</h4>
                          <span className="text-[7px] bg-[#FF5C1A]/10 text-[#FF5C1A] px-2 py-0.5 rounded font-black uppercase">60% Comis.</span>
                        </div>
                        <div className="flex gap-4 mt-2">
                          <div>
                            <p className="text-[7px] text-zinc-600 uppercase font-bold">Afiliados</p>
                            <p className="text-[10px] font-black">84</p>
                          </div>
                          <div>
                            <p className="text-[7px] text-zinc-600 uppercase font-bold">Vendas Total</p>
                            <p className="text-[10px] font-black">R$ 12.400</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                         <button className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"><Settings size={14}/></button>
                         <button className="p-2 bg-white/5 rounded-lg text-red-500/50 hover:text-red-500 transition-colors"><X size={14}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. FINANCEIRO */}
            {activeTab === "Financeiro" && (
              <motion.div key="fin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl">
                   <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">Aguardando Aprovação</p>
                   <h2 className="text-3xl font-black tracking-tighter text-[#FF5C1A]">R$ 18.420,00</h2>
                </div>

                <div className="space-y-3">
                   {[1, 2].map(i => (
                     <div key={i} className="bg-[#141414] p-4 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500"><CreditCard size={14}/></div>
                               <div>
                                  <p className="text-[10px] font-black uppercase">Solicitação #{i}842</p>
                                  <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest font-mono">Partner 0{i} • 19/02/26</p>
                               </div>
                            </div>
                            <p className="text-sm font-black text-white">R$ 1.500,00</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                           <button className="py-2 bg-green-500 text-black text-[9px] font-black uppercase rounded-lg hover:bg-green-400 transition-all flex items-center justify-center gap-2"><CheckCircle2 size={12}/> Aprovar</button>
                           <button className="py-2 bg-white/5 text-red-500 text-[9px] font-black uppercase rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Recusar</button>
                        </div>
                     </div>
                   ))}
                </div>
              </motion.div>
            )}

            {/* 6. CONFIGURAÇÕES ADM */}
            {activeTab === "Configurações" && (
              <motion.div key="config" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 max-w-xl">
                 <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]"><Shield size={24}/></div>
                       <div><h4 className="font-black uppercase text-[11px] tracking-widest text-white">Ajustes da Operação</h4><p className="text-[8px] text-zinc-600 uppercase font-bold tracking-tighter">Parâmetros globais do sistema</p></div>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-white/5">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">Taxa Intermediação</span>
                          <span className="text-[11px] font-black text-[#FF5C1A]">5.0%</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase">Taxa Fixa Saque</span>
                          <span className="text-[11px] font-black text-[#FF5C1A]">R$ 1,50</span>
                       </div>
                       <button className="w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-[#FF5C1A] transition-colors">Salvar Novas Taxas</button>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM NAV MOBILE */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-[#141414]/90 backdrop-blur-xl border-t border-white/5 px-2 py-4 flex justify-around items-center z-50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === item.id ? "text-[#FF5C1A]" : "text-zinc-600"
                }`}
              >
                <item.icon size={20} strokeWidth={activeTab === item.id ? 3 : 2} />
                <span className="text-[7px] font-black uppercase tracking-tight">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      <style jsx global>{`
        body { background-color: #0D0D0D; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}