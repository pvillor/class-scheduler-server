import type { FastifyRequest, FastifyReply } from 'fastify'

export async function signOut(_: FastifyRequest, reply: FastifyReply) {
  try {
    reply.clearCookie('refreshToken', {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })

    return reply.status(200).send({ message: 'Successfully signed out' })
  } catch (error) {
    return reply
      .status(500)
      .send({ message: 'An error occurred while signing out' })
  }
}
