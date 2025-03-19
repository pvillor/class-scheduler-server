import type { FastifyReply, FastifyRequest } from 'fastify'
import { StudentNotFoundError } from '../../use-cases/errors/student-not-found-error'
import z from 'zod'
import { makeFetchSchedulesUseCase } from '../../use-cases/factories/make-fetch-schedules-use-case'

const fetchSchedulesParams = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  teacherId: z.string().optional(),
  studentId: z.string().optional(),
})

export async function fetchSchedules(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { from, to, teacherId, studentId } = fetchSchedulesParams.parse(
      request.query
    )

    const role = (await request.getUserRole()) as
      | 'student'
      | 'teacher'
      | 'admin'

    const userId = await request.getCurrentUserId()

    const schedulesData = {
      userId,
      role,
      from,
      to,
      teacherId: role === 'teacher' ? userId : teacherId,
      studentId: role === 'student' ? userId : studentId,
    }

    const fetchSchedulesUseCase = makeFetchSchedulesUseCase()

    const schedules = await fetchSchedulesUseCase.execute(schedulesData)

    return reply.status(200).send({
      schedules,
    })
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
