import { prisma } from '@/prisma'

export const userService = {
  getUserById: async(id: string) => {
    const user = prisma.user.findUnique({ where: { id } })
    return user
  },
  hasUser: async(id: string) => {
    const user = await prisma.user.findUnique({ where: { id } })
    return !!user
  },
  getUsers: async() => {
    const users = await prisma.user.findMany()
    return users
  },
  getUserByEmail: async(email: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  },
}
