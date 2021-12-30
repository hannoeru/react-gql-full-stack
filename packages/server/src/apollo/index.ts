import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-fastify'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '@/resolvers/user.resolver'
import { prisma } from '@/prisma'
import type { ApolloServerPlugin } from 'apollo-server-plugin-base'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import type { User } from '@/prisma'

export interface ApolloContext {
  request: FastifyRequest
  reply: FastifyReply
  prisma: typeof prisma
  user?: User
}

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close()
        },
      }
    },
  }
}

export const createApolloServer = async(app: FastifyInstance) => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  })

  const server = new ApolloServer<ApolloContext>({
    schema,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: (ctx) => {
      return {
        ...ctx,
        prisma,
        user: ctx.request.user,
      }
    },
  })

  return server
}
