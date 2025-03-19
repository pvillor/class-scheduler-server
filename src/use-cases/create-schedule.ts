import type { SchedulesRepository } from '../repositories/schedules-repository'
import type { UsersRepository } from '../repositories/users-repository'
import { StudentNotFoundError } from './errors/student-not-found-error'
import { TeacherNotFoundError } from './errors/teacher-not-found-error'

export interface CreateScheduleUseCaseRequest {
  studentId: string
  teacherId: string
  date: string
}

export class CreateScheduleUseCase {
  constructor(
    private schedulesRepository: SchedulesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ studentId, teacherId, date }: CreateScheduleUseCaseRequest) {
    const student = await this.usersRepository.findById(studentId)

    if (!student) {
      throw new StudentNotFoundError()
    }

    const teacher = await this.usersRepository.findById(teacherId)

    if (!teacher) {
      throw new TeacherNotFoundError()
    }

    const schedule = await this.schedulesRepository.create({
      studentId,
      teacherId,
      date,
    })

    return { schedule }
  }
}
