import { config } from '@/constants'
import { passport } from '@/passposrt'
import type { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async(fastify, _opts) => {
  fastify.get(
    '/api/auth/github',
    passport.authenticate('github', { scope: ['email', 'user:profile'] }),
  )

  fastify.get(
    '/api/auth/callback',
    passport.authenticate('github', { failureRedirect: `${config.frontendUrl}/`, successRedirect: `${config.frontendUrl}/profile` }),
  )
}

export default routes
