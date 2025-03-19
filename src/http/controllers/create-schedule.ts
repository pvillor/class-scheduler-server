import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateScheduleUseCase } from '../../use-cases/factories/make-create-schedule-use-case'
import { StudentNotFoundError } from '../../use-cases/errors/student-not-found-error'
import { TeacherNotFoundError } from '../../use-cases/errors/teacher-not-found-error'
import { ForbiddenError } from '../errors/forbidden-error'

export async function createSchedule(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createScheduleBodySchema = z.object({
    teacherId: z.string().cuid2(),
    date: z.string(),
  })
  try {
    const role = await request.getUserRole()

    if (role !== 'student') {
      throw new ForbiddenError()
    }

    const studentId = await request.getCurrentUserId()

    const { teacherId, date } = createScheduleBodySchema.parse(request.body)

    const createScheduleUseCase = makeCreateScheduleUseCase()

    const { schedule } = await createScheduleUseCase.execute({
      studentId,
      teacherId,
      date,
    })

    return reply.status(201).send({
      scheduleId: schedule.id,
    })
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof TeacherNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({ message: error.message })
    }

    throw error
  }
}
