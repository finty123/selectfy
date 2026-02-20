import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // 1. Criar Admin Master
  const admin = await prisma.user.upsert({
    where: { email: 'admin@selectfy.com' },
    update: {},
    create: {
      email: 'admin@selectfy.com',
      name: 'Admin Selectfy',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'APPROVED',
      commissionPercentage: 0,
    },
  })

  // 2. Criar um Produto de Exemplo
  await prisma.product.create({
    data: {
      name: 'Método Escala Black',
      description: 'Curso avançado de tráfego pago',
      platform: 'kiwify',
      baseUrl: 'https://pay.kiwify.com.br/abc123',
      createdById: admin.id,
    },
  })

  console.log('✅ Seed finalizado: Admin criado (admin@selectfy.com / admin123)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })