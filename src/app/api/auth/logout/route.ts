import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout" });

  // Forçamos a expiração do cookie auth_token
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0), // Data no passado para deletar
    path: "/",
  });

  return response;
}
