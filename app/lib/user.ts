import { prisma } from '@/app/lib/prisma'

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}
