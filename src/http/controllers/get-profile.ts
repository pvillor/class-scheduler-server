import type { FastifyReply, FastifyRequest } from 'fastify'
import { db } from '../../drizzle/client'
import { users } from '../../drizzle/schema/users'
import { eq } from 'drizzle-orm'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const userId = await request.getCurrentUserId()

  const [user] = await db.select().from(users).where(eq(users.id, userId))

  return reply.status(200).send(user)
}
