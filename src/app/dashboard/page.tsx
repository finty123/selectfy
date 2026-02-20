import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
// Importe suas opções de autenticação aqui
// import { authOptions } from "../api/auth/[...nextauth]/route"; 

export default async function DashboardPage() {
  // 1. Aqui buscaríamos a sessão do usuário para saber QUEM está logado
  // Por enquanto, vamos simular ou buscar o primeiro usuário do banco
  const user = await prisma.user.findFirst({
    where: { email: "admin@selectfy.com" }, // Ajuste para usar a sessão real depois
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo, {user?.name || "Usuário"}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Saldo */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Saldo Disponível</p>
          <h2 className="text-3xl font-bold text-green-600">R$ {user?.balance.toFixed(2)}</h2>
        </div>

        {/* Card de Vendas (Simulado por enquanto) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Vendas Realizadas</p>
          <h2 className="text-3xl font-bold text-blue-600">0</h2>
        </div>

        {/* Card de Cliques (Simulado por enquanto) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Cliques nos Links</p>
          <h2 className="text-3xl font-bold text-purple-600">0</h2>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
          Explorar Marketplace
        </button>
      </div>
    </div>
  );
}
