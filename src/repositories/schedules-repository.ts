import type { Schedule, CreateSchedule } from '../interfaces/schedule'

export interface SchedulesRepository {
  findManyByStudentId(id: string): Promise<Schedule[]>
  findManyByTeacherId(id: string): Promise<Schedule[]>
  create(data: CreateSchedule): Promise<Schedule>
}
