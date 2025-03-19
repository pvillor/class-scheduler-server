import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { db } from '../../drizzle/client'
import { users } from '../../drizzle/schema/users'
import { eq } from 'drizzle-orm'
import { UnauthorizedError } from '../errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async request => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string; role: string }>()

        return sub
      } catch (error) {
        throw new UnauthorizedError()
      }
    }

    request.getUserRole = async () => {
      const userId = await request.getCurrentUserId()

      const [user] = await db.select().from(users).where(eq(users.id, userId))

      return user.role
    }
  })
})
