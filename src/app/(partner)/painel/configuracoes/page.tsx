"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Lock, Bell, creditCard, Save } from "lucide-react";

export default function ConfiguracoesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8"
    >
      {/* HEADER DA PÁGINA */}
      <div>
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-2">Ajustes da Conta</h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase italic">Gerencie o seu perfil, segurança e dados de recebimento.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA ESQUERDA: PERFIL E SEGURANÇA */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CARD: DADOS PESSOAIS */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
              <User size={16} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Informações Pessoais</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nome Completo</label>
                <input type="text" defaultValue="JOÃO SILVA" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">E-mail de Acesso</label>
                <input type="email" defaultValue="JOAO@SELECTFY.COM" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all opacity-60" disabled />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">WhatsApp / Telefone</label>
                <input type="text" defaultValue="+55 (11) 99999-9999" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Documento (CPF/CNPJ)</label>
                <input type="text" defaultValue="***.***.***-**" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all opacity-60" disabled />
              </div>
            </div>
          </div>

          {/* CARD: SEGURANÇA / SENHA */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
              <Lock size={16} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Segurança</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="password" placeholder="SENHA ATUAL" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
                <input type="password" placeholder="NOVA SENHA" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
                <input type="password" placeholder="CONFIRMAR NOVA SENHA" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DA DIREITA: DADOS BANCÁRIOS E BOTÃO SALVAR */}
        <div className="space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
              <creditCard size={16} className="text-[#FF5C1A]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest">Recebimento (PIX)</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-xl">
                <p className="text-[8px] font-bold text-orange-500 uppercase leading-relaxed text-center">
                  O saldo das vendas será enviado automaticamente para a chave cadastrada abaixo.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Tipo de Chave</label>
                <select className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all">
                  <option>E-MAIL</option>
                  <option>CPF</option>
                  <option>TELEFONE</option>
                  <option>CHAVE ALEATÓRIA</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Chave Pix</label>
                <input type="text" placeholder="INSIRA SUA CHAVE" className="w-full bg-[#0D0D0D] border border-white/5 rounded-lg px-4 py-3 text-[10px] font-bold uppercase outline-none focus:border-[#FF5C1A]/50 transition-all" />
              </div>
            </div>
          </div>

          <button className="w-full bg-[#FF5C1A] hover:bg-[#e65217] text-black h-14 rounded-2xl flex items-center justify-center gap-3 transition-all group">
            <Save size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Salvar Alterações</span>
          </button>

          <div className="p-4 bg-[#141414] border border-white/5 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-red-500/20 transition-all">
             <div className="flex items-center gap-3 text-zinc-500 group-hover:text-red-500">
               <Bell size={14} />
               <span className="text-[8px] font-black uppercase tracking-widest">Notificações por E-mail</span>
             </div>
             <div className="w-8 h-4 bg-[#FF5C1A] rounded-full relative">
                <div className="absolute right-1 top-1 w-2 h-2 bg-black rounded-full" />
             </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}