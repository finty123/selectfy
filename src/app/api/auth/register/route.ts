export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password, socialNetwork, niche } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        socialNetwork,
        niche,
        status: "PENDING", // Regra: inicia pendente
      },
    });
    return Response.json({ message: "Cadastro realizado. Aguarde aprovação." });
  } catch (e) {
    return Response.json({ error: "E-mail já cadastrado" }, { status: 400 });
  }
}
