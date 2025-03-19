import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { schedules } from '../../drizzle/schema/schedules'
import type { CreateSchedule } from '../../interfaces/schedule'
import type { SchedulesRepository } from '../schedules-repository'

export class DrizzleSchedulesRepository implements SchedulesRepository {
  async findManyByStudentId(id: string) {
    const schedulesByStudentId = await db
      .select()
      .from(schedules)
      .where(eq(schedules.studentId, id))

    return schedulesByStudentId
  }

  async findManyByTeacherId(id: string) {
    const schedulesByTeacherId = await db
      .select()
      .from(schedules)
      .where(eq(schedules.teacherId, id))

    return schedulesByTeacherId
  }

  async create({ studentId, teacherId, date }: CreateSchedule) {
    const [result] = await db
      .insert(schedules)
      .values({
        studentId,
        teacherId,
        scheduledAt: new Date(date),
        status: 'pending',
      })
      .$returningId()

    const scheduleId = result.id

    const [schedule] = await db
      .select()
      .from(schedules)
      .where(eq(schedules.id, scheduleId))

    return schedule
  }
}
