"use client";
import React, { useEffect, useState } from "react";

// 1. DEFINIÇÃO DO COMPONENTE CARD (Para corrigir o erro de 'Cannot find name Card')
const Card = ({ label, val }: { label: string; val: string | number | undefined }) => (
  <div className="bg-[#141414] border border-white/5 p-6 rounded-[24px]">
    <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
      {val !== undefined ? val : "---"}
    </h3>
  </div>
);

export default function PartnerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/partner/stats");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erro ao buscar stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-zinc-500 uppercase font-black text-[10px] animate-pulse">Carregando métricas...</div>;

  return (
    <div className="space-y-6 p-4">
      <div className="bg-[#141414] p-8 rounded-[32px] border border-white/5">
        <h2 className="text-[14px] font-black uppercase tracking-[0.4em] text-[#FF5C1A] mb-1">Performance</h2>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Acompanhe seus resultados em tempo real</p>
      </div>

      {/* Onde o erro acontecia, agora o Card existe! */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card label="Comissão Total" val={`R$ ${data?.totalCommission?.toFixed(2) || "0,00"}`} />
        <Card label="Saldo Disponível" val={`R$ ${data?.availableBalance?.toFixed(2) || "0,00"}`} />
        <Card label="Vendas Realizadas" val={data?.totalSales || 0} />
      </div>
    </div>
  );
}