"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, ShoppingBag, Link as LinkIcon, Globe, 
  RefreshCw, X, Package, Layers, Tag, Filter
} from "lucide-react";

const NICHES = ["Saúde", "Finanças", "Ganha Dinheiro", "Relacionamento", "Beleza", "Outros"];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Todos");
  
  const [newProduct, setNewProduct] = useState({
    name: "", description: "", platform: "Kiwify", baseUrl: "", niche: "Saúde"
  });

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({ ...newProduct, createdById: 1 }),
    });
    setModalOpen(false);
    loadProducts();
  };

  const filteredProducts = activeFilter === "Todos" 
    ? products 
    : products.filter((p: any) => p.niche === activeFilter);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Produtos</h1>
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">Gestão por Segmentação</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-[#FF5C1A] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#ff7a45] transition-all"
          >
            <Plus size={14} /> Novo Produto
          </button>
        </div>
      </div>

      {/* FILTROS DE NICHO */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {["Todos", ...NICHES].map((n) => (
          <button
            key={n}
            onClick={() => setActiveFilter(n)}
            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeFilter === n 
                ? 'bg-white text-black border-white' 
                : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          [1,2,3,4].map(i => <div key={i} className="h-48 bg-zinc-900/50 animate-pulse rounded-2xl border border-white/5" />)
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl bg-zinc-900/10">
            <Package size={40} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Nenhum produto em {activeFilter}</p>
          </div>
        ) : (
          filteredProducts.map((product: any) => (
            <div key={product.id} className="bg-zinc-900/20 border border-white/5 p-5 rounded-2xl hover:bg-zinc-900/40 transition-all group border-l-2 hover:border-l-[#FF5C1A]">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[8px] font-black px-2 py-1 bg-white/5 text-zinc-400 rounded uppercase tracking-tighter border border-white/5">
                  {product.platform}
                </span>
                <div className="flex items-center gap-1 text-[8px] font-black text-[#FF5C1A] uppercase bg-[#FF5C1A]/10 px-2 py-1 rounded">
                  <Tag size={10} /> {product.niche || "Geral"}
                </div>
              </div>
              
              <h3 className="text-white font-bold uppercase tracking-tight text-sm mb-1 group-hover:text-[#FF5C1A] transition-colors">{product.name}</h3>
              <p className="text-zinc-500 text-[10px] line-clamp-2 mb-6 leading-relaxed">{product.description || "Sem descrição disponível."}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Layers size={14} />
                  <span className="text-[10px] font-bold uppercase">
                    {product._count?.assignments || 0} Ativos
                  </span>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white"><LinkIcon size={14}/></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL LATERAL ATUALIZADO */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]" onClick={() => setModalOpen(false)} />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-[#0A0A0A] border-l border-white/10 z-[110] p-10 overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-xl font-black text-white uppercase italic">Novo Item<span className="text-[#FF5C1A]">.</span></h2>
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Configurar oferta na vitrine</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-2 text-zinc-500 hover:text-white bg-white/5 rounded-xl transition"><X /></button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Nicho / Segmento</label>
                  <div className="grid grid-cols-2 gap-2">
                    {NICHES.map(n => (
                      <button 
                        key={n} type="button"
                        onClick={() => setNewProduct({...newProduct, niche: n})}
                        className={`p-3 rounded-xl border text-[9px] font-black uppercase transition-all ${
                          newProduct.niche === n ? 'bg-[#FF5C1A] border-[#FF5C1A] text-white shadow-lg shadow-[#FF5C1A]/20' : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Nome do Produto</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-[#FF5C1A] outline-none" placeholder="Ex: E-book Seca Tudo" onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Plataforma</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-[#FF5C1A] outline-none appearance-none" onChange={e => setNewProduct({...newProduct, platform: e.target.value})}>
                      <option value="Kiwify">Kiwify</option>
                      <option value="Kirvano">Kirvano</option>
                      <option value="Hotmart">Hotmart</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Payout Médio</label>
                    <input type="number" placeholder="R$ 100" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-[#FF5C1A] outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Link de Acesso</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-[#FF5C1A] outline-none" placeholder="https://..." onChange={e => setNewProduct({...newProduct, baseUrl: e.target.value})} />
                </div>

                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">Copy / Descrição</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs font-bold text-white focus:border-[#FF5C1A] outline-none resize-none" placeholder="Breve resumo para o afiliado..." onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
              </div>

              <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FF5C1A] hover:text-white transition-all shadow-xl mt-8">
                Confirmar e Publicar
              </button>
            </form>
          </motion.div>
        </>
      )}
    </div>
  );
}