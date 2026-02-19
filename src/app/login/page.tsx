"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Lock, Mail, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation"; // Import para navegação

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Função para simular o login e redirecionar
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula uma validação de 1.5 segundos e joga para o painel
    setTimeout(() => {
      router.push("/painel");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center p-6 selection:bg-[#FF5C1A]/30 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FF5C1A08_0%,_transparent_65%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="text-2xl font-[1000] tracking-tighter uppercase mb-6">
            SELECTFY<span className="text-[#FF5C1A]">.</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">Acesse sua estrutura</h2>
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">Ambiente Restrito e Criptografado</p>
        </div>

        <div className="bg-[#080808] border border-white/[0.05] p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5C1A]/40 to-transparent" />
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">ID de Acesso</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF5C1A] transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="seu@email.com"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-[#FF5C1A]/50 focus:bg-white/[0.04] transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Chave Digital</label>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-zinc-700 hover:text-[#FF5C1A] transition">Recuperar</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-[#FF5C1A] transition-colors" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-[#FF5C1A]/50 focus:bg-white/[0.04] transition-all placeholder:text-zinc-800"
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#FF5C1A] disabled:bg-zinc-800 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#e55317] transition-all shadow-xl shadow-[#FF5C1A]/10 mt-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <>Entrar no Painel <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            Ainda não é parceiro? <a href="/cadastro" className="text-white hover:text-[#FF5C1A] transition-colors ml-2 border-b border-white/10 pb-0.5">Solicitar Acesso</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}