import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserAlreadyExistsError } from '../../use-cases/errors/user-already-exists-error'
import { makeCreateAccountUseCase } from '../../use-cases/factories/make-create-account-use-case'

export async function createAccount(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['student', 'teacher', 'admin']).default('student'),
  })

  const { name, email, password, role } = createAccountBodySchema.parse(
    request.body
  )

  try {
    const createAccountUseCase = makeCreateAccountUseCase()

    const { user } = await createAccountUseCase.execute({
      name,
      email,
      password,
      role,
    })

    return reply.status(201).send({
      userId: user.id,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
