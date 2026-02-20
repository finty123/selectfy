"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, CheckCircle2, ShieldCheck, Video, Globe, Loader2, MessageCircle, MapPin, Users, Zap } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    whatsapp: "",
    location: "",
    socialNetwork: "", // Será preenchido com @usuario
    followers: "",
    niche: "",
    experience: "Não", // Sim/Não
    views: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Unificamos a plataforma com o user para o banco
      const finalData = {
        ...formData,
        socialNetwork: `${platform}: ${formData.socialNetwork}`,
        niche: `${formData.niche} | Views: ${formData.views} | Exp: ${formData.experience}`
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao registrar");
      setIsSent(true);
    } catch (err: any) {
      setError(err.message);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  if (isSent) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
         <div className="w-20 h-20 bg-[#FF5C1A]/10 border border-[#FF5C1A]/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,92,26,0.1)]">
           <CheckCircle2 className="text-[#FF5C1A]" size={40} />
         </div>
         <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Análise Iniciada</h2>
         <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8">Recebemos seu perfil detalhado. Nossa equipe analisará seu potencial de alcance e entrará em contato via WhatsApp.</p>
         <button onClick={() => window.location.href = '/login'} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF5C1A] hover:text-white transition">Acompanhar Status</button>
       </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#FF5C1A]/30">
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-900 z-50">
        <motion.div className="h-full bg-[#FF5C1A] shadow-[0_0_15px_#FF5C1A]" animate={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-xl font-[1000] tracking-tighter uppercase">SELECTFY<span className="text-[#FF5C1A]">.</span></div>
        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Ficha de Cadastro <span className="text-zinc-800">/</span> 0{step}</div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="st1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Informações Básicas</h2>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Identificação e Acesso</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Nome Completo" name="name" value={formData.name} onChange={handleChange} placeholder="Seu nome" />
                  <Input label="E-mail Pessoal" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" />
                  <Input label="Sua Senha" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                  <Input label="WhatsApp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+55 (00) 00000-0000" />
                </div>
                <div className="flex justify-center pt-8">
                  <BtnNext onClick={() => setStep(2)} />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="st2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Presença Digital</h2>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Onde está sua audiência?</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <SelectCard icon={Instagram} label="Instagram" active={platform === "Instagram"} onClick={() => setPlatform("Instagram")} />
                  <Video size={24} className={platform === "TikTok" ? 'text-[#FF5C1A]' : 'text-zinc-700'} /> {/* Simplificado para brevidade */}
                  <SelectCard icon={Globe} label="Outro" active={platform === "Outro"} onClick={() => setPlatform("Outro")} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label={`@usuário no ${platform}`} name="socialNetwork" value={formData.socialNetwork} onChange={handleChange} placeholder="@seu.perfil" />
                  <Input label="Número de Seguidores" name="followers" value={formData.followers} onChange={handleChange} placeholder="Ex: 50k" />
                  <Input label="Nicho" name="niche" value={formData.niche} onChange={handleChange} placeholder="Ex: Lifestyle, Moda..." />
                  <Input label="Cidade / UF" name="location" value={formData.location} onChange={handleChange} placeholder="São Paulo, SP" />
                </div>
                <div className="flex justify-center gap-6 pt-8">
                  <BtnBack onClick={() => setStep(1)} />
                  <BtnNext onClick={() => setStep(3)} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="st3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Performance</h2>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Seu histórico de resultados</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Já divulgou infoprodutos?</p>
                      <div className="flex gap-4 pt-2">
                        {["Sim", "Não"].map((opt) => (
                          <button 
                            key={opt}
                            onClick={() => setFormData({...formData, experience: opt})}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition border ${formData.experience === opt ? 'border-[#FF5C1A] bg-[#FF5C1A]/10 text-white' : 'border-white/10 bg-white/5 text-zinc-500'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                   </div>
                   <Input label="Média de Visualizações" name="views" value={formData.views} onChange={handleChange} placeholder="Views nos Stories" />
                </div>
                <div className="flex justify-center gap-6 pt-8">
                  <BtnBack onClick={() => setStep(2)} />
                  <BtnNext onClick={() => setStep(4)} />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="st4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Finalização</h2>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Segurança e Termos</p>
                </div>
                <div className="bg-[#080808] border border-white/[0.05] p-8 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center gap-4 text-white bg-white/5 p-4 rounded-2xl border border-white/10">
                    <ShieldCheck size={24} className="text-[#FF5C1A]" />
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Sua conta será criada como "Pendente". A liberação de produtos ocorre após validação manual do seu perfil.</p>
                  </div>
                </div>
                <div className="flex justify-center gap-6 pt-8">
                  <BtnBack onClick={() => setStep(3)} />
                  <button 
                    disabled={loading}
                    onClick={handleRegister} 
                    className="bg-[#FF5C1A] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#FF5C1A]/20 hover:scale-105 transition-all flex items-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Solicitar Acesso"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES (Padrão Selectfy)
const Input = ({ label, ...props }: any) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 ml-1">{label}</label>
    <input {...props} className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-sm outline-none focus:border-[#FF5C1A]/40 transition-all text-white placeholder:text-zinc-800" />
  </div>
);

const SelectCard = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all gap-3 ${active ? 'border-[#FF5C1A] bg-[#FF5C1A]/5' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
    <Icon size={24} className={active ? 'text-[#FF5C1A]' : 'text-zinc-700'} />
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-zinc-600'}`}>{label}</span>
  </button>
);

const BtnNext = ({ onClick }: any) => (
  <button onClick={onClick} className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#FF5C1A] hover:text-white transition-all">Continuar</button>
);

const BtnBack = ({ onClick }: any) => (
  <button onClick={onClick} className="text-zinc-600 px-8 py-5 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">Voltar</button>
);