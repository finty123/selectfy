import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    // Usa a mesma SECRET do .env
    const decoded = verify(token, process.env.JWT_SECRET || "secret") as any;

    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Erro ao validar sessão:", error);
    return null;
  }
}