"use client"; // Transformamos em Client para gerenciar o estado de montagem global

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Garante que o texto apareça antes da fonte carregar
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Marca como montado para evitar o "flash" de tela branca no Safari
    setMounted(true);

    // 2. Fix de altura real para Safari iOS (evita que a barra de endereços corte o site)
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ 
          opacity: mounted ? 1 : 0, // Só mostra o conteúdo quando estiver pronto
          transition: "opacity 0.3s ease-in-out",
          backgroundColor: "#0D0D0D" // Cor de fundo imediata para evitar flash branco
        }}
      >
        {children}
        
        {/* CSS Injetado para Safari */}
        <style jsx global>{`
          :root {
            --vh: 1vh;
          }

          /* Força o Safari a ocupar a tela inteira sem scroll fantasma */
          html, body {
            height: 100vh;
            height: -webkit-fill-available;
            background-color: #0D0D0D;
            overflow-x: hidden;
          }

          /* Suaviza o render de fontes no motor Webkit */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Fix para elementos com backdrop-blur no Safari */
          .backdrop-blur-md {
            -webkit-backdrop-blur-md: 12px;
          }
        `}</style>
      </body>
    </html>
  );
}