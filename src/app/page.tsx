"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";
import { 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Target, 
  Layers, 
  TrendingUp,
  Lock,
  ArrowUpRight,
  ChevronRight,
  Globe
} from "lucide-react";

// --- COMPONENTES DE ALTA FIDELIDADE ---

const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <motion.span 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-block px-4 py-1.5 rounded-full border border-[#FF5C1A]/30 bg-[#FF5C1A]/5 text-[#FF5C1A] text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
  >
    {children}
  </motion.span>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="p-8 md:p-10 rounded-[2rem] bg-[#080808] border border-white/[0.05] hover:border-[#FF5C1A]/30 transition-all duration-500 group relative overflow-hidden text-left"
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF5C1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-8 group-hover:bg-[#FF5C1A]/10 transition-colors">
      <Icon className="text-zinc-500 group-hover:text-[#FF5C1A] transition-colors" size={24} />
    </div>
    <h3 className="text-xl font-bold mb-4 tracking-tight text-white">{title}</h3>
    <p className="text-zinc-500 leading-relaxed text-[15px] font-medium">{desc}</p>
  </motion.div>
);

export default function SelectfyLanding() {
  // Definição explícita das variantes para evitar erros de linting
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  // Definição explícita da transição
  const standardTransition: Transition = { 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] 
  };

  return (
    <div className="bg-[#000000] text-white selection:bg-[#FF5C1A]/30 overflow-x-hidden font-sans antialiased">
      
      {/* 1. HEADER */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.05] bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter uppercase">
            SELECTFY<span className="text-[#FF5C1A]">.</span>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            <a href="#como-funciona" className="hover:text-white transition-colors">Operação</a>
            <a href="#estrutura" className="hover:text-white transition-colors">Infraestrutura</a>
            <a href="#exclusividade" className="hover:text-white transition-colors">Exclusividade</a>
          </div>

          <div className="flex items-center gap-6">
            <a href="/login" className="hidden sm:block text-[11px] font-bold uppercase tracking-widest hover:text-[#FF5C1A] transition">Login</a>
            <a href="/cadastro" className="bg-[#FF5C1A] text-white px-6 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-[#e55317] transition-all shadow-lg shadow-[#FF5C1A]/10">
              Solicitar Acesso
            </a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[#FF5C1A]/5 blur-[140px] rounded-full -z-10" />
        
        <div className="max-w-6xl text-center">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={standardTransition}
          >
            <h1 className="text-[48px] md:text-[88px] font-black leading-[1.05] tracking-[-0.05em] uppercase mb-10">
              Controle sua audiência.<br />
              <span className="text-zinc-700 font-bold">Monetize com estrutura.</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C1A] via-[#ff9d75] to-[#FF5C1A] bg-[length:200%_auto] animate-gradient">Evolua com estratégia.</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              A Selectfy é uma estrutura privada de monetização para influenciadores que buscam transformar influência em receita previsível com inteligência.
            </p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ ...standardTransition, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
          >
            <a href="/cadastro" className="w-full sm:w-auto bg-[#FF5C1A] text-white px-12 py-5 rounded-2xl font-black text-lg text-center transition-all hover:scale-[1.03] shadow-xl shadow-[#FF5C1A]/20 uppercase">
              Solicitar Acesso
            </a>
            <a href="/login" className="w-full sm:w-auto border border-white/10 bg-white/[0.03] backdrop-blur-md text-white px-12 py-5 rounded-2xl font-black text-lg text-center hover:bg-white/5 transition-all uppercase">
              Entrar na plataforma
            </a>
          </motion.div>

          {/* DASHBOARD PREVIEW */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative mx-auto max-w-5xl border border-white/10 rounded-[2.5rem] bg-[#080808] overflow-hidden p-3 md:p-6 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5C1A]/5 via-transparent to-transparent pointer-events-none" />
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] mb-8">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Private Monetization Intelligence v2.0</span>
              <div className="w-10" />
            </div>
            <div className="grid md:grid-cols-3 gap-8 px-6 pb-6">
              <div className="p-8 bg-black/40 border border-white/[0.03] rounded-3xl text-center">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Receita Consolidada</p>
                <h4 className="text-4xl font-black text-[#FF5C1A]">R$ 284.150,00</h4>
                <div className="mt-4 flex items-center justify-center gap-2 text-green-500 text-[10px] font-bold tracking-tighter">
                   <ArrowUpRight size={14} /> +12.4% VS ÚLTIMO CICLO
                </div>
              </div>
              <div className="md:col-span-2 flex items-end gap-3 h-36 bg-black/40 border border-white/[0.03] p-8 rounded-3xl">
                {[40, 70, 45, 90, 65, 80, 100, 85, 95].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="flex-1 bg-gradient-to-t from-[#FF5C1A] to-[#ff8c5a] rounded-t-md opacity-80" 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DIAGNÓSTICO */}
      <section className="py-32 md:py-48 px-8 border-y border-white/[0.05] bg-zinc-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8 text-left">
              <SectionBadge>Diagnóstico</SectionBadge>
              <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1.1] tracking-tighter">
                Audiência sem estrutura <br /> <span className="text-zinc-700">não gera poder.</span>
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed font-medium border-l-2 border-[#FF5C1A] pl-8">
                A maioria dos influenciadores são escravos da próxima "publi". Nós construímos o seu próprio motor de vendas. Controle, margem e escala real.
              </p>
            </div>
            <div className="grid gap-4 text-left">
              {["Controle de Ativos", "Estratégia Proprietária", "Independência de Algoritmo"].map((item, i) => (
                <div key={i} className="p-6 bg-[#080808] border border-white/[0.05] rounded-2xl flex items-center gap-6 group hover:border-[#FF5C1A]/20 transition-all">
                  <div className="text-[#FF5C1A] font-black text-2xl opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                  <p className="text-zinc-400 font-bold uppercase text-[12px] tracking-[0.2em]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ESTRUTURA */}
      <section id="estrutura" className="py-32 md:py-48 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <SectionBadge>Infraestrutura</SectionBadge>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6">A infraestrutura por trás <br/> da sua monetização</h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              Não oferecemos produtos. Construímos uma estrutura proprietária para transformar audiência em receita previsível.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard icon={Layers} title="Produtos Estratégicos" desc="Criamos ofertas digitais estruturadas a partir do comportamento e desejos reais da sua audiência." />
            <FeatureCard icon={BarChart3} title="Modelo Financeiro" desc="Você participa de um modelo de comissão estruturado para maximizar margem e recorrência." />
            <FeatureCard icon={ShieldCheck} title="Painel Proprietário" desc="Sua central de inteligência. Acompanhe vendas, métricas e performance em tempo real." />
            <FeatureCard icon={Zap} title="Arquitetura de Conversão" desc="Checkouts otimizados, páginas testadas e funis de alta performance para reduzir fricção." />
            <FeatureCard icon={Target} title="Evolução e Metas" desc="Sua conta evolui conforme resultados. Desbloqueios estratégicos conforme o crescimento." />
            <FeatureCard icon={Globe} title="Infraestrutura Escalável" desc="Estrutura preparada para picos de tráfego massivo sem comprometer estabilidade." />
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-40 md:py-60 px-8 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5C1A]/15 blur-[180px] rounded-full -z-10" />
        
        <motion.div 
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={standardTransition}
        >
          <h2 className="text-5xl md:text-[110px] font-black uppercase leading-[0.85] tracking-[-0.06em] mb-16">
            Audiência é poder.<br />
            <span className="text-[#FF5C1A]">Estrutura é domínio.</span>
          </h2>
          
          <a href="/cadastro" className="group relative inline-block bg-[#FF5C1A] text-white px-16 py-8 rounded-[2rem] font-black text-2xl uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-[#FF5C1A]/40 overflow-hidden">
            <span className="relative z-10">Solicitar Acesso</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 mix-blend-overlay" />
          </a>
        </motion.div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-20 px-8 border-t border-white/[0.05] bg-[#020202]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <div className="text-2xl font-black tracking-tighter uppercase mb-2">SELECTFY<span className="text-[#FF5C1A]">.</span></div>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.4em]">The Private Structure for Global Creators</p>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <a href="#" className="hover:text-white transition">Termos</a>
            <a href="#" className="hover:text-white transition">Privacidade</a>
            <a href="/login" className="hover:text-[#FF5C1A] transition">Acesso Privado</a>
          </div>
          <div className="text-zinc-700 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} SELECTFY GROUP.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
      `}</style>
    </div>
  );
}