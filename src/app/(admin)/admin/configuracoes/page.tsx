"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Save, Percent, Target, Link2, Users, 
  ShieldCheck, RefreshCw, BadgeDollarSign, 
  Settings2, AlertTriangle, MousePointerClick, 
  Clock, CheckCircle2
} from "lucide-react";

export default function AdminSettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      {/* HEADER ESTRATÉGICO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#141414] p-8 rounded-[32px] border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Engenharia de Comissões</h2>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Defina as regras de traqueamento, atribuição e payouts da rede</p>
        </div>
        <button className="relative z-10 bg-[#FF5C1A] text-black px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(255,92,26,0.2)]">
          <Save size={18} strokeWidth={3} /> Salvar Parâmetros
        </button>
        <div className="absolute right-0 top-0 opacity-5 -mr-10 -mt-10">
          <Settings2 size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUNA 1: REGRAS DE COMISSIONAMENTO */}
        <div className="space-y-6">
          <section className="bg-[#141414] border border-white/5 rounded-[32px] p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <BadgeDollarSign size={18} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Divisão de Receita</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Taxa Padrão da Plataforma (%)</label>
                <div className="relative">
                  <input type="text" defaultValue="4.99" className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-4 text-xl font-black text-white outline-none focus:border-[#FF5C1A] transition-all" />
                  <span className="absolute right-4 top-4 text-zinc-700 font-black">%</span>
                </div>
              </div>

              <div>
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Teto de Comissão Afiliado (%)</label>
                <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-4 text-[10px] font-black text-white outline-none appearance-none uppercase">
                  <option>ATÉ 60% DO VALOR LÍQUIDO</option>
                  <option selected>ATÉ 80% DO VALOR LÍQUIDO</option>
                  <option>LIBERADO (DEFINIDO PELO PRODUTOR)</option>
                </select>
              </div>

              <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
                <p className="text-[7px] text-yellow-500 font-black uppercase leading-tight">
                  Nota: Alterações nas taxas globais não afetam vendas já processadas ou em checkout aberto.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
             <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
              <Clock size={18} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Janela de Payout</h3>
            </div>
            <div className="space-y-4">
               <div>
                  <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Prazo de Garantia (Dias)</label>
                  <input type="number" defaultValue="7" className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-4 text-lg font-black text-white outline-none" />
               </div>
               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[9px] font-black uppercase text-zinc-400">Antecipação de Saldo</span>
                  <span className="text-[8px] font-black text-green-500 uppercase bg-green-500/10 px-2 py-1 rounded">HABILITADO</span>
               </div>
            </div>
          </section>
        </div>

        {/* COLUNA 2: TRAQUEAMENTO E ATRIBUIÇÃO */}
        <div className="space-y-6">
          <section className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
              <Target size={18} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Inteligência de Traqueamento</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Modelo de Atribuição de Venda</label>
                <div className="grid grid-cols-1 gap-2">
                  <button className="bg-[#FF5C1A] text-black p-3 rounded-xl text-[9px] font-black uppercase text-left">Último Clique (Last Click)</button>
                  <button className="bg-white/5 text-zinc-500 p-3 rounded-xl text-[9px] font-black uppercase text-left hover:text-white transition-all">Primeiro Clique (First Click)</button>
                  <button className="bg-white/5 text-zinc-500 p-3 rounded-xl text-[9px] font-black uppercase text-left hover:text-white transition-all">Múltiplos Cliques (Linear)</button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest block">Duração do Cookie (Dias)</label>
                <div className="relative flex items-center">
                  <input type="text" defaultValue="60" className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-4 text-xl font-black text-white outline-none" />
                  <Link2 size={16} className="absolute right-4 text-zinc-700" />
                </div>
                <p className="text-[7px] text-zinc-600 font-bold uppercase">Tempo que o lead fica vinculado ao parceiro após o clique.</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-white uppercase">Cross-Sell Tracking</span>
                  <span className="text-[7px] text-zinc-500 font-black uppercase">Comissionar em todos os produtos do produtor</span>
                </div>
                <div className="w-10 h-5 bg-[#FF5C1A] rounded-full relative">
                   <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COLUNA 3: GESTÃO DE PARCEIROS E INFRA */}
        <div className="space-y-6">
          <section className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
              <Users size={18} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Política de Partners</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-2xl border border-white/5">
                <div>
                  <p className="text-[9px] font-black text-white uppercase mb-1">Aprovação de Afiliados</p>
                  <p className="text-[7px] text-zinc-600 font-bold uppercase">Manual (Análise da Equipe)</p>
                </div>
                <RefreshCw size={14} className="text-zinc-600" />
              </div>

              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1 block">Score Mínimo para Saque Antecipado</label>
                <input type="text" defaultValue="850" className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl p-4 text-sm font-black text-white outline-none" />
                <p className="text-[7px] text-zinc-600 font-bold uppercase">Baseado em taxa de reembolso e volume mensal.</p>
              </div>
            </div>
          </section>

          <section className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
              <ShieldCheck size={18} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Prevenção de Fraude</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-zinc-400">
                <span>Auto-Afiliação</span>
                <span className="text-red-500">BLOQUEADO</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-zinc-400">
                <span>Multi-Contas (Mesmo CPF)</span>
                <span className="text-red-500">BLOQUEADO</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-black uppercase text-zinc-400">
                <span>Venda de CPF próprio</span>
                <span className="text-yellow-500">ALERTA ADM</span>
              </div>
            </div>
          </section>

          <div className="bg-[#0D0D0D] border-2 border-dashed border-[#FF5C1A]/20 rounded-[32px] p-6 text-center">
            <MousePointerClick className="mx-auto text-[#FF5C1A] mb-3 opacity-50" size={24} />
            <h4 className="text-[9px] font-black uppercase text-white mb-2">Simulador de Checkout</h4>
            <button className="w-full py-3 bg-white/5 text-white rounded-xl text-[8px] font-black uppercase hover:bg-white/10 transition-all">Testar Atribuição de Link</button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}