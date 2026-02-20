"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, 
  Clock, CheckCircle2, AlertCircle, Landmark, X, DollarSign,
  ChevronRight, TrendingUp
} from "lucide-react";

export default function PartnerFinanceiro() {
  // ESTADOS DE DADOS
  const [balance, setBalance] = useState(1250.00);
  const [pending, setPending] = useState(450.00);
  
  // ESTADOS DE INTERAÇÃO
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState("");
  const [error, setError] = useState("");

  // Mock de Histórico
  const [history, setHistory] = useState([
    { id: 1, type: 'saque', amount: 1200.00, date: '18/10/2023', status: 'completed' },
    { id: 2, type: 'saque', amount: 800.00, date: '05/10/2023', status: 'pending' },
    { id: 3, type: 'comissao', amount: 149.90, date: '20/10/2023', status: 'completed' },
  ]);

  const handleOpenModal = () => {
    setError("");
    setWithdrawValue("");
    setShowWithdrawModal(true);
  };

  const handleWithdrawSubmit = async () => {
    const value = parseFloat(withdrawValue);

    // Validações Iniciais
    if (isNaN(value) || value <= 0) {
      setError("Insira um valor válido para o saque.");
      return;
    }
    if (value > balance) {
      setError("Saldo insuficiente para realizar este saque.");
      return;
    }

    setIsWithdrawLoading(true);
    
    try {
      const res = await fetch('/api/partner/withdraw', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount: value,
            userId: 1 // Integrar com seu hook de Auth futuramente
        }) 
      });

      const data = await res.json();

      if (res.ok) {
        // LÓGICA DE DÉBITO IMEDIATO NA TELA
        setBalance(prev => prev - value);
        setPending(prev => prev + value);
        
        // Adiciona ao histórico visualmente (opcional)
        const newTransaction = {
            id: Date.now(),
            type: 'saque',
            amount: value,
            date: new Date().toLocaleDateString('pt-BR'),
            status: 'pending'
        };
        setHistory([newTransaction as any, ...history]);

        setShowWithdrawModal(false);
        alert("Solicitação de saque enviada com sucesso!");
      } else {
        setError(data.error || "Erro ao processar solicitação.");
      }

    } catch (err) {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
      
      {/* HEADER E SALDO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#141414] border border-white/5 p-6 md:p-10 rounded-[32px] relative overflow-hidden group shadow-2xl">
          <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
            <Wallet size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Saldo Disponível</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 mt-10 items-start md:items-center">
              <button 
                onClick={handleOpenModal}
                className="w-full md:w-auto bg-[#FF5C1A] text-black px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl active:scale-95"
              >
                Solicitar Saque PIX
              </button>
              
              <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/5 w-full md:w-auto">
                <Clock size={16} className="text-zinc-500" />
                <div>
                  <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">Aguardando Liberação</p>
                  <p className="text-sm font-bold text-zinc-300">R$ {pending.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 p-8 rounded-[32px] flex flex-col justify-between shadow-2xl">
          <div>
            <div className="w-12 h-12 bg-[#FF5C1A]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#FF5C1A]/20">
              <Landmark size={20} className="text-[#FF5C1A]" />
            </div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-3">Conta de Recebimento</h3>
            <p className="text-[12px] text-zinc-500 font-medium leading-relaxed">
              Sua comissão é enviada para a chave PIX cadastrada. O prazo de análise é de 48h.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-[#FF5C1A] uppercase hover:gap-3 transition-all mt-8 group">
            Gerenciar Chave PIX <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* HISTÓRICO */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <TrendingUp size={18} className="text-zinc-600" />
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Atividade Recente</h3>
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px]">
              <thead className="bg-white/[0.02] border-b border-white/5">
                <tr>
                  <th className="p-6 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Descrição</th>
                  <th className="p-6 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Data</th>
                  <th className="p-6 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-center">Status</th>
                  <th className="p-6 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.02]">
                {history.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.01] transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          item.type === 'saque' ? 'bg-red-500/5 text-red-500 border border-red-500/10' : 'bg-green-500/5 text-green-500 border border-green-500/10'
                        }`}>
                          {item.type === 'saque' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                        </div>
                        <span className="text-[11px] font-black text-white uppercase tracking-tight">
                          {item.type === 'saque' ? 'Resgate de Saldo' : 'Comissão de Venda'}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.date}</td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        {item.status === 'completed' ? (
                          <div className="flex items-center gap-1.5 text-green-400 bg-green-400/5 border border-green-400/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
                            <CheckCircle2 size={12} /> Concluído
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/5 border border-amber-500/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
                            <Clock size={12} /> Processando
                          </div>
                        )}
                      </div>
                    </td>
                    <td className={`p-6 text-sm font-black text-right ${
                      item.type === 'saque' ? 'text-zinc-500' : 'text-green-500'
                    }`}>
                      {item.type === 'saque' ? '-' : '+'} R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DE SAQUE */}
      <AnimatePresence>
        {showWithdrawModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowWithdrawModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 md:p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF5C1A] rounded-lg flex items-center justify-center">
                      <DollarSign size={16} className="text-black" />
                    </div>
                    <h3 className="text-white font-black uppercase text-xs tracking-widest">Confirmar Saque</h3>
                  </div>
                  <button onClick={() => setShowWithdrawModal(false)} className="text-zinc-500 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-black/50 border border-white/5 p-8 rounded-3xl text-center">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Disponível agora</p>
                  <p className="text-3xl font-black text-white">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Quanto deseja sacar?</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 font-black text-sm group-focus-within:text-[#FF5C1A]">R$</span>
                    <input 
                      type="number"
                      value={withdrawValue}
                      onChange={(e) => setWithdrawValue(e.target.value)}
                      placeholder="0,00"
                      className="w-full bg-black border border-white/10 p-5 pl-12 rounded-2xl text-white font-black text-lg outline-none focus:border-[#FF5C1A] transition-all"
                    />
                  </div>
                  {error && (
                    <div className="flex items-center gap-2 text-red-500 mt-2 ml-1">
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-black uppercase">{error}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 space-y-4">
                  <button 
                    disabled={isWithdrawLoading}
                    onClick={handleWithdrawSubmit}
                    className="w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FF5C1A] hover:text-white transition-all disabled:opacity-50 active:scale-95 shadow-2xl"
                  >
                    {isWithdrawLoading ? "Processando..." : "Confirmar Solicitação"}
                  </button>
                  <p className="text-[9px] text-zinc-600 text-center font-bold uppercase px-6">
                    O valor será debitado do saldo disponível e enviado para sua conta PIX.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}