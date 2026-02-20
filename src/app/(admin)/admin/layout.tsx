"use client";



import React, { useState } from "react";

import { motion } from "framer-motion";

import {

  LayoutDashboard, ShoppingBag, BadgeDollarSign, Wallet,

  Users, Settings, Menu, X, LogOut, ShieldCheck

} from "lucide-react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";



export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();

  const router = useRouter();



  const menuItems = [

    { id: "Dashboard", icon: LayoutDashboard, label: "Início", href: "/admin" },

    { id: "Vendas", icon: BadgeDollarSign, label: "Vendas", href: "/admin/vendas" },

    { id: "Usuarios", icon: Users, label: "Usuários", href: "/admin/usuarios" },

    { id: "Produtos", icon: ShoppingBag, label: "Produtos", href: "/admin/produtos" },

    { id: "Financeiro", icon: Wallet, label: "Financeiro", href: "/admin/financeiro" },

    { id: "Ajustes", icon: Settings, label: "Ajustes", href: "/admin/configuracoes" },

  ];



  const handleLogout = async () => {

    try {

      // 1. Limpa o cookie no servidor

      await fetch("/api/auth/logout", { method: "POST" });

     

      // 2. Limpeza manual via JS para garantir

      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";



      // 3. Reset total da aplicação

      window.location.href = "/login";

    } catch (error) {

      console.error("Erro ao sair:", error);

    }

  };



  return (

    <div className="min-h-screen bg-[#0D0D0D] text-white flex overflow-hidden font-sans antialiased">

     

      {/* SIDEBAR DESKTOP */}

      <motion.aside

        animate={{ width: isSidebarOpen ? 200 : 64 }}

        className="bg-[#141414] border-r border-white/5 flex flex-col z-50 h-screen shrink-0 hidden md:flex"

      >

        <div className="p-6 h-16 flex items-center justify-between border-b border-white/5">

          {isSidebarOpen && (

            <span className="text-sm font-black tracking-tighter uppercase">

              SELECTFY<span className="text-[#FF5C1A]">.</span>

              <span className="text-[7px] ml-1 bg-[#FF5C1A]/10 text-[#FF5C1A] px-1.5 py-0.5 rounded">ADM</span>

            </span>

          )}

          <button

            type="button"

            onClick={() => setSidebarOpen(!isSidebarOpen)}

            className="p-1.5 hover:bg-white/5 rounded-md transition-colors mx-auto text-zinc-500"

          >

            {isSidebarOpen ? <X size={16} /> : <Menu size={16} />}

          </button>

        </div>



        <nav className="flex-1 px-3 py-4 space-y-1">

          {menuItems.map((item) => (

            <Link

              key={item.id}

              href={item.href}

              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative ${

                pathname === item.href

                  ? "bg-[#FF5C1A]/10 text-[#FF5C1A]"

                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"

              }`}

            >

              <item.icon size={18} />

              {isSidebarOpen && (

                <span className="text-[10px] font-bold uppercase tracking-widest text-nowrap">

                  {item.label}

                </span>

              )}

            </Link>

          ))}

        </nav>



        <div className="p-4 border-t border-white/5">

          <button

            type="button"

            onClick={handleLogout}

            className="relative z-[60] w-full flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:text-red-500 hover:bg-red-500/5 transition-all group"

          >

            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />

            {isSidebarOpen && (

              <span className="text-[10px] font-black uppercase tracking-widest">

                Sair

              </span>

            )}

          </button>

        </div>

      </motion.aside>



      {/* MENU MOBILE (ESTILO APP - BOTTOM BAR) */}

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#141414]/90 backdrop-blur-xl border-t border-white/5 z-[100] px-4 py-2 flex justify-between items-center shadow-2xl">

        {menuItems.slice(0, 5).map((item) => (

          <Link

            key={item.id}

            href={item.href}

            className={`flex flex-col items-center gap-1 p-2 transition-all ${

              pathname === item.href ? "text-[#FF5C1A]" : "text-zinc-500"

            }`}

          >

            <item.icon size={20} />

            <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>

          </Link>

        ))}

        <button

          onClick={handleLogout}

          className="flex flex-col items-center gap-1 p-2 text-zinc-500"

        >

          <LogOut size={20} />

          <span className="text-[8px] font-bold uppercase tracking-tighter">Sair</span>

        </button>

      </div>



      {/* CONTEÚDO PRINCIPAL */}

      <main className="flex-1 overflow-y-auto bg-[#0D0D0D] flex flex-col h-screen relative pb-20 md:pb-0">

        <header className="h-16 border-b border-white/5 px-6 md:px-8 flex items-center justify-between sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-md z-40">

          <div className="flex items-center gap-2">

            <ShieldCheck size={14} className="text-[#FF5C1A]" />

            <h1 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF5C1A]">

              Ambiente Administrativo

            </h1>

          </div>

          <div className="flex items-center gap-4">

              <div className="hidden sm:flex flex-col items-end">

                <span className="text-[8px] font-black text-white uppercase tracking-tighter">Admin Master</span>

                <span className="text-[7px] font-bold text-zinc-600 uppercase">Acesso Root</span>

              </div>

              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#FF5C1A] uppercase">

                AD

              </div>

          </div>

        </header>

       

        <div className="p-4 md:p-8 max-w-[1600px] mx-auto w-full">

          {children}

        </div>

      </main>

    </div>

  );

}