import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Tentativa de login para:", email);

    // 1. Busca o usuário
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log("Usuário não encontrado.");
      return Response.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    // 2. Verifica a senha
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      console.log("Senha incorreta.");
      return Response.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    // 3. Verifica status (Admins passam direto, Parceiros precisam de aprovação)
    if (user.role !== "ADMIN" && user.status !== "APPROVED") {
      console.log("Acesso negado: Conta pendente ou rejeitada.");
      return Response.json({ error: "Sua conta ainda está em análise manual." }, { status: 403 });
    }

    // 4. Gera o Token JWT
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("ERRO: JWT_SECRET não definida no .env");
      return Response.json({ error: "Erro de configuração no servidor" }, { status: 500 });
    }

    const token = sign(
      { userId: user.id, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    console.log("Login bem sucedido para:", user.role);

    // 5. Configuração do Cookie
    // Removemos o 'Secure' em localhost para evitar que o navegador descarte o cookie
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = [
     `auth_token=${token}; Path=/; ...`,
      "Path=/",
      "HttpOnly",
      "Max-Age=604800",
      "SameSite=Lax",
      isProduction ? "Secure" : "", 
    ].filter(Boolean).join("; ");

    return Response.json(
      { 
        success: true,
        role: user.role, 
        name: user.name 
      }, 
      {
        status: 200,
        headers: { "Set-Cookie": cookieOptions }
      }
    );

  } catch (error: any) {
    console.error("ERRO CRÍTICO NO LOGIN:", error);
    return Response.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}