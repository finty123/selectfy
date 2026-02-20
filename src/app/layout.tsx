import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Selectfy | Estrutura de Vendas",
  description: "Ambiente Restrito e Criptografado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={inter.variable}>
      <body 
        className={`${inter.className} antialiased`}
        style={{ 
          backgroundColor: "#000000",
          margin: 0,
          padding: 0,
          minHeight: "100vh"
        }}
      >
        {children}
      </body>
    </html>
  );
}