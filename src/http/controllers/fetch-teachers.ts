import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchTeachersUseCase } from '../../use-cases/factories/make-fetch-teachers-use-case'

export async function fetchTeachers(_: FastifyRequest, reply: FastifyReply) {
  const fetchTeachersUseCase = makeFetchTeachersUseCase()

  const teachers = await fetchTeachersUseCase.execute()

  return reply.status(200).send({
    teachers,
  })
}
