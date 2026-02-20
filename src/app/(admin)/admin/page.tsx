"use client";
import { motion } from "framer-motion";
import { 
  TrendingUp, Users, ShoppingCart, DollarSign, 
  Trophy, Package, ArrowUpRight, MousePointer2, 
  BarChart3, Award
} from "lucide-react";

export default function AdminDash() {
  const cards = [
    { label: "Volume Geral (GMV)", val: "R$ 1.842.000", icon: DollarSign, trend: "+12.4%" },
    { label: "Vendas Aprovadas", val: "14.280", icon: ShoppingCart, trend: "+8.1%" },
    { label: "Net Profit (Fees)", val: "R$ 420.500", icon: TrendingUp, trend: "+18.2%" },
    { label: "Parceiros Ativos", val: "842", icon: Users, trend: "+42" },
  ];

  const topPartners = [
    { name: "Agência Alpha Scale", sales: "R$ 242.000", users: 1420, level: "Black" },
    { name: "Marcos Digital Pro", sales: "R$ 189.500", users: 980, level: "Platinum" },
    { name: "Empire Media", sales: "R$ 156.000", users: 1120, level: "Platinum" },
  ];

  const topProducts = [
    { name: "Método Turbo VSL", revenue: "R$ 540.000", conversion: "4.2%" },
    { name: "Mentoria Black Diamond", revenue: "R$ 320.000", conversion: "1.8%" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-[#141414] border border-white/5 p-6 rounded-[24px] relative overflow-hidden group">
            <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-20 transition-all text-[#FF5C1A] rotate-12">
              <c.icon size={80}/>
            </div>
            <div className="flex justify-between items-start mb-4">
              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{c.label}</p>
              <span className="text-[8px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase">{c.trend}</span>
            </div>
            <h3 className="text-2xl font-black text-white">{c.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* GRÁFICO PRINCIPAL (SIMULADO) */}
        <div className="lg:col-span-8 bg-[#141414] border border-white/5 rounded-[32px] p-8 flex flex-col justify-between min-h-[400px]">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Performance de Vendas</h4>
              <p className="text-[8px] text-zinc-600 font-bold uppercase mt-1">Comparativo de receita bruta vs lucro líquido</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF5C1A]" />
                <span className="text-[8px] font-black text-zinc-500 uppercase">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <span className="text-[8px] font-black text-zinc-500 uppercase">Saques</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-end gap-2 pt-12 pb-4">
            {[40, 70, 45, 90, 65, 80, 100, 55, 75, 60, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  className="w-full bg-gradient-to-t from-[#FF5C1A]/20 to-[#FF5C1A] rounded-t-sm group-hover:brightness-125 transition-all"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between border-t border-white/5 pt-4 text-[7px] font-black text-zinc-600 uppercase tracking-widest">
            <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
            <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
          </div>
        </div>

        {/* RANKING DE PARCEIROS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="text-[#FF5C1A]" size={18} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Top Partners</h4>
            </div>
            
            <div className="space-y-4">
              {topPartners.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-[#0D0D0D] border border-white/5 rounded-2xl group hover:border-[#FF5C1A]/40 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-zinc-700">0{i+1}</span>
                    <div>
                      <p className="text-[9px] font-black text-white uppercase">{p.name}</p>
                      <p className="text-[7px] text-[#FF5C1A] font-bold uppercase">{p.level} Member</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white">{p.sales}</p>
                    <p className="text-[7px] text-zinc-600 font-bold uppercase">{p.users} Leads</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[8px] font-black uppercase tracking-widest text-zinc-400 transition-all">
              Ver Ranking Completo
            </button>
          </div>

          {/* MÉTRICAS DE PRODUTO */}
          <div className="bg-[#141414] border border-white/5 rounded-[32px] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-[#FF5C1A]" size={18} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Best Sellers</h4>
            </div>
            <div className="space-y-4">
              {topProducts.map((prod, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase">
                    <span className="text-zinc-400">{prod.name}</span>
                    <span className="text-white">{prod.conversion} Conv.</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#FF5C1A]`} style={{ width: i === 0 ? '85%' : '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ANALYTICS FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#141414] border border-white/5 p-6 rounded-[24px] flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><MousePointer2 size={20}/></div>
          <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase">Cliques Únicos (24h)</p>
            <h5 className="text-xl font-black text-white">42.802</h5>
          </div>
        </div>
        <div className="bg-[#141414] border border-white/5 p-6 rounded-[24px] flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><BarChart3 size={20}/></div>
          <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase">Taxa de Checkout</p>
            <h5 className="text-xl font-black text-white">18.4%</h5>
          </div>
        </div>
        <div className="bg-[#141414] border border-white/5 p-6 rounded-[24px] flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-xl"><Award size={20}/></div>
          <div>
            <p className="text-[8px] font-black text-zinc-600 uppercase">Novos Parceiros (Hoje)</p>
            <h5 className="text-xl font-black text-white">+14</h5>
          </div>
        </div>
      </div>
    </motion.div>
  );
}