import { PrismaClient } from "@prisma/client";

// Impede que o Next.js abra múltiplas conexões com o banco em ambiente de dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Útil para ver no console as queries executadas
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ADICIONE ESTA LINHA PARA CORRIGIR O ERRO NO DASHBOARD:
export default prisma;