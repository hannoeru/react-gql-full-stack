import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

const logLevel: Prisma.LogLevel[] = process.env.NODE_ENV === 'development'
  ? ['query', 'info', 'warn', 'error']
  : ['warn', 'error']

const prisma = new PrismaClient({
  log: logLevel,
})

export * from '@prisma/client'
export { prisma }
