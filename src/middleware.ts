import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Tenta buscar o cookie exatamente com o nome usado na rota de login
  const token = request.cookies.get('auth_token')?.value;

  console.log(`[MIDDLEWARE] Acessando: ${pathname} | Token presente: ${!!token}`);

  // 1. Proteger rotas de Admin e Painel
  if (pathname.startsWith('/admin') || pathname.startsWith('/painel') || pathname.startsWith('/partner')) {
    if (!token) {
      console.log("[MIDDLEWARE] Sem token. Redirecionando para /login");
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Impedir que usuário logado acesse o Login ou Cadastro novamente
  if ((pathname === '/login' || pathname === '/register') && token) {
    console.log("[MIDDLEWARE] Já logado. Redirecionando para /admin");
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Configuração de quais rotas o middleware deve vigiar
export const config = {
  matcher: [
    '/admin/:path*',
    '/painel/:path*',
    '/partner/:path*',
    '/login',
    '/register'
  ],
};