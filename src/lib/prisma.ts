import { PrismaClient } from "@prisma/client";

// Impede que o Next.js abra múltiplas conexões com o banco em ambiente de dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Útil para você ver no console se a comissão foi calculada certo
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;