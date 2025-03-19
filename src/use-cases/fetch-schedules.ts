import type { Schedule } from '../interfaces/schedule'
import type { SchedulesRepository } from '../repositories/schedules-repository'
import type { UsersRepository } from '../repositories/users-repository'
import { StudentIdRequiredError } from './errors/student-id-required-error'
import { StudentNotFoundError } from './errors/student-not-found-error'
import { TeacherIdRequiredError } from './errors/teacher-id-required-error'
import { TeacherNotFoundError } from './errors/teacher-not-found-error'

export interface FetchSchedulesUseCaseRequest {
  role: 'student' | 'teacher' | 'admin'
  startDate?: Date
  endDate?: Date
  teacherId?: string
  studentId?: string
}

export class FetchSchedulesUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    role,
    startDate,
    endDate,
    teacherId,
    studentId,
  }: FetchSchedulesUseCaseRequest) {
    let schedules: Schedule[]

    const period = startDate && endDate ? { startDate, endDate } : {}

    if (role === 'student' && !studentId) {
      throw new StudentIdRequiredError()
    }

    if (role === 'teacher' && !teacherId) {
      throw new TeacherIdRequiredError()
    }

    const student =
      role === 'student' && studentId
        ? await this.usersRepository.findById(studentId)
        : null
    const teacher =
      role === 'teacher' && teacherId
        ? await this.usersRepository.findById(teacherId)
        : null

    if (role === 'student' && !student) {
      throw new StudentNotFoundError()
    }

    if (role === 'teacher' && !teacher) {
      throw new TeacherNotFoundError()
    }

    switch (role) {
      case 'student': {
        schedules = await this.schedulesRepository.findManyByStudentId(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          studentId!,
          {
            ...period,
            teacherId,
          }
        )
        break
      }

      case 'teacher': {
        schedules = await this.schedulesRepository.findManyByTeacherId(
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          teacherId!,
          {
            ...period,
            studentId,
          }
        )
        break
      }

      default: {
        schedules = await this.schedulesRepository.findMany({
          ...period,
          studentId,
          teacherId,
        })
        break
      }
    }

    return schedules
  }
}
