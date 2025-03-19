import type { Schedule, CreateSchedule } from '../interfaces/schedule'

export interface SchedulesRepository {
  findManyByStudentId(
    studentId: string,
    filters?: { startDate?: Date; endDate?: Date; teacherId?: string }
  ): Promise<Schedule[]>
  findManyByTeacherId(
    teacherId: string,
    filters?: { startDate?: Date; endDate?: Date; studentId?: string }
  ): Promise<Schedule[]>
  findMany(filters?: {
    startDate?: Date
    endDate?: Date
    studentId?: string
    teacherId?: string
  }): Promise<Schedule[]>
  create(data: CreateSchedule): Promise<Schedule>
}
