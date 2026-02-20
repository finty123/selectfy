"use client";
import { useEffect, useState } from "react";
import { 
  Check, X, UserCircle, MapPin, Instagram, 
  Users, Zap, ShieldAlert, Smartphone, RefreshCw,
  MoreVertical, Settings, ShieldCheck, Percent, Mail
} from "lucide-react";

export default function AdminUsers() {
  // CORREÇÃO AQUI: Definimos o tipo como any[] em vez de never[]
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/partners");
      const data = await res.json();
      // Garante que estamos enviando um array para o estado
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error(err); 
      setUsers([]); // Fallback para evitar erros de renderização
    } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/admin/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (selectedUser?.id === id) setSelectedUser(null);
      loadUsers();
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const filteredUsers = users.filter((u: any) => 
    filter === "ALL" ? true : u.status === filter
  );

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen font-sans">
      
      {/* HEADER COMPACTO */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Usuários</h1>
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">Gestão e permissões da plataforma</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-white/5">
            {["ALL", "PENDING", "APPROVED"].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                  filter === f ? 'bg-[#FF5C1A] text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {f === "ALL" ? "Todos" : f === "PENDING" ? "Pendentes" : "Ativos"}
              </button>
            ))}
          </div>
          <button onClick={loadUsers} className="p-2 text-zinc-500 hover:text-white transition">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* LISTA ESTILO TABELA */}
      <div className="bg-zinc-900/20 border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/5 bg-white/[0.02] text-[9px] font-black text-zinc-500 uppercase tracking-widest">
          <div className="col-span-4">Usuário / E-mail</div>
          <div className="col-span-2">Rede Social</div>
          <div className="col-span-2">Métricas</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Ação</div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-zinc-600 animate-pulse text-[10px] uppercase font-black">Sincronizando...</div>
        ) : (
          filteredUsers.map((user: any) => (
            <div 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className="grid grid-cols-12 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors cursor-pointer group"
            >
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-[#FF5C1A]/50 transition-colors">
                  <UserCircle size={16} className="text-zinc-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">{user.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>

              <div className="col-span-2">
                <span className="text-[10px] font-bold text-[#FF5C1A] flex items-center gap-1.5">
                  <Instagram size={12} /> {user.socialNetwork?.split(':')[1] || user.socialNetwork}
                </span>
              </div>

              <div className="col-span-2 flex gap-4 text-zinc-400">
                <div className="flex items-center gap-1"><Users size={12} /> <span className="text-[10px] font-bold">{user.followers || '0'}</span></div>
                <div className="flex items-center gap-1"><Zap size={12} /> <span className="text-[10px] font-bold">{user.niche?.split('|')[1]?.split(':')[1] || '0'}</span></div>
              </div>

              <div className="col-span-2 text-center">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                  user.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="col-span-2 text-right">
                <button className="p-2 hover:bg-white/5 rounded-lg text-zinc-500">
                  <Settings size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAINEL LATERAL (DRAWER) */}
      {selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setSelectedUser(null)} />
          <div className="fixed right-0 top-0 h-full w-[380px] bg-[#0A0A0A] border-l border-white/10 z-50 p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/10">
                <UserCircle size={32} className="text-[#FF5C1A]" />
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 text-zinc-500 hover:text-white bg-white/5 rounded-xl"><X size={20}/></button>
            </div>

            <h2 className="text-xl font-black text-white uppercase mb-1">{selectedUser.name}</h2>
            <p className="text-zinc-500 text-xs mb-8 flex items-center gap-2"><Mail size={12}/> {selectedUser.email}</p>

            <div className="space-y-6">
              <div>
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Nível de Acesso</p>
                <div className="grid grid-cols-2 gap-2">
                  <button className={`p-3 rounded-xl border text-[10px] font-black uppercase flex items-center justify-center gap-2 transition ${selectedUser.role === 'ADMIN' ? 'bg-[#FF5C1A] border-[#FF5C1A] text-white' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                    <ShieldCheck size={14}/> Admin
                  </button>
                  <button className={`p-3 rounded-xl border text-[10px] font-black uppercase flex items-center justify-center gap-2 transition ${selectedUser.role === 'USER' ? 'bg-[#FF5C1A] border-[#FF5C1A] text-white' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                    <Users size={14}/> Usuário
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">Comissão Personalizada (%)</p>
                <div className="relative">
                  <input type="number" placeholder="Padrão (10%)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#FF5C1A] outline-none transition" />
                  <Percent size={14} className="absolute right-4 top-3.5 text-zinc-600" />
                </div>
              </div>

              <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                 <div className="flex justify-between text-[10px] uppercase font-bold"><span className="text-zinc-500">Localização:</span><span className="text-zinc-300">{selectedUser.location || 'Não informado'}</span></div>
                 <div className="flex justify-between text-[10px] uppercase font-bold"><span className="text-zinc-500">Nicho:</span><span className="text-zinc-300">{selectedUser.niche?.split('|')[0] || 'Geral'}</span></div>
              </div>

              <div className="pt-6 space-y-3">
                {selectedUser.status === 'PENDING' ? (
                  <>
                    <button onClick={() => handleStatus(selectedUser.id, 'APPROVED')} className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#FF5C1A] hover:text-white transition-all shadow-xl shadow-white/5">Aprovar Parceiro</button>
                    <button onClick={() => handleStatus(selectedUser.id, 'REJECTED')} className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Recusar</button>
                  </>
                ) : (
                  <button onClick={() => handleStatus(selectedUser.id, 'PENDING')} className="w-full bg-white/5 text-zinc-500 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-white transition-all">Reverter para Pendente</button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}