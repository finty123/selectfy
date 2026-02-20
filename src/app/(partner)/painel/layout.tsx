"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, ShoppingBag, BadgeDollarSign, Wallet, Store, 
  Settings, Menu, X, LogOut, Lock 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { id: "Dashboard", icon: LayoutDashboard, label: "Dashboard", href: "/painel" },
    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas", href: "/painel/vendas" },
    { id: "Produtos", icon: ShoppingBag, label: "Produtos", href: "/painel/produtos" },
    { id: "Financeiro", icon: Wallet, label: "Financeiro", href: "/painel/financeiro" },
    { id: "Marketplace", icon: Store, label: "Market", href: "#", locked: true },
  { id: "Ajustes", icon: Settings, label: "Ajustes", href: "/painel/configuracoes" },
];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden font-sans antialiased">
      {/* SIDEBAR */}
      <motion.aside 
        animate={{ width: isSidebarOpen ? 240 : 80 }}
        className="bg-[#141414] border-r border-white/5 flex flex-col z-50 h-screen shrink-0 hidden md:flex"
      >
        <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">
          {isSidebarOpen && <span className="text-sm font-black tracking-tighter uppercase">SELECTFY<span className="text-[#FF5C1A]">.</span></span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-white/5 rounded-md transition-colors mx-auto text-zinc-500">
            {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.locked ? "#" : item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${
                pathname === item.href ? "bg-[#FF5C1A]/10 text-[#FF5C1A]" : "text-zinc-500 hover:text-zinc-200"
              } ${item.locked ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <item.icon size={18} />
              {isSidebarOpen && <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>}
              {item.locked && isSidebarOpen && <Lock size={10} className="ml-auto" />}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:text-red-500 transition-all group">
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sair</span>}
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] flex flex-col h-screen relative">
        <header className="h-16 border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md z-40">
           <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">Painel Autorizado</h1>
           <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] font-bold text-white uppercase">JS</div>
        </header>
        
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}