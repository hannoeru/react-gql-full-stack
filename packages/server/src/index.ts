import 'reflect-metadata'
import fastify from 'fastify'
import secureSession from 'fastify-secure-session'
import { passport } from '@/passposrt'
import authRoutes from '@/routes/auth.route'
import { createApolloServer } from '@/apollo'
import { secureSessionOptions } from '@/constants'
import type { FastifyCorsOptions } from 'fastify-cors'

const PORT = process.env.PORT || 4000

const corsOptions: FastifyCorsOptions = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true,
}

const app = fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV !== 'production'
      ? {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }
      : false,
  },
})

app.register(secureSession, secureSessionOptions)

// passport
app.register(passport.initialize())
app.register(passport.secureSession())

// test ping
app.get('/ping', (_request, reply) => {
  reply.send('pong!')
})

app.register(authRoutes)

const start = async() => {
  try {
    const server = await createApolloServer(app)

    await server.start()
    app.register(server.createHandler({
      path: '/api/graphql',
      cors: corsOptions as any,
    }))

    await app.listen(PORT)
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
