import type { User } from '@/prisma'

declare module 'fastify' {
  interface PassportUser extends User {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_SECRET: string
      SESSION_SALT: string
      COOKIE_DOMAIN: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      DOMAIN: string
      FRONTEND_URL: string
    }
  }
}
