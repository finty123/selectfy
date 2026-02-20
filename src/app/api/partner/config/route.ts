import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// Importe aqui seu helper de pegar o ID do usuário logado (ex: authOptions)
// const session = await getServerSession(authOptions);

export async function POST(req: Request) {
  try {
    const { pixKey, pixKeyType, userId } = await req.json(); // userId temporário enquanto não há session

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        pixKey,
        pixKeyType,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar dados PIX" }, { status: 500 });
  }
}
