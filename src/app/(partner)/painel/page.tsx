"use client";
import { useEffect, useState } from "react";
// ... seus outros imports de ícones

export default function PartnerDash() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashData() {
      try {
        const res = await fetch("/api/partner/dashboard");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    loadDashData();
  }, []);

  if (loading) return <div className="p-8 text-[10px] font-black uppercase animate-pulse">Carregando métricas...</div>;

  return (
    <div className="space-y-8">
      {/* Aqui você substitui os valores fixos pelos do 'data' */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card label="Comissão Total" val={`R$ ${data?.totalCommission?.toFixed(2)}`} />
        <Card label="Saldo Disponível" val={`R$ ${data?.availableBalance?.toFixed(2)}`} />
        <Card label="Vendas Realizadas" val={data?.totalSales} />
      </div>
      
      {/* O gráfico agora usaria data?.dailySales */}
    </div>
  );
}