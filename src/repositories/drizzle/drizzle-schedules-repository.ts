import { and, eq, gte, lte } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { schedules } from '../../drizzle/schema/schedules'
import type { CreateSchedule, Schedule } from '../../interfaces/schedule'
import type { SchedulesRepository } from '../schedules-repository'
import dayjs from 'dayjs'

export class DrizzleSchedulesRepository implements SchedulesRepository {
  async findMany(filters?: {
    startDate?: Date
    endDate?: Date
    studentId?: string
    teacherId?: string
  }): Promise<Schedule[]> {
    const query = db.select().from(schedules)

    if (filters?.studentId) {
      query.where(eq(schedules.studentId, filters.studentId))
    }

    if (filters?.teacherId) {
      query.where(eq(schedules.teacherId, filters.teacherId))
    }

    if (filters?.startDate) {
      query.where(eq(schedules.scheduledAt, filters.startDate))
    }

    if (filters?.endDate) {
      query.where(eq(schedules.scheduledAt, filters.endDate))
    }

    if (filters?.startDate && filters?.endDate) {
      const startDate = filters?.startDate
        ? dayjs(filters.startDate).startOf('day').toDate()
        : dayjs().subtract(7, 'days').startOf('day').toDate()

      const endDate = filters?.endDate
        ? dayjs(filters.endDate).endOf('day').toDate()
        : dayjs(startDate).add(7, 'days').endOf('day').toDate()

      if (dayjs(endDate).diff(dayjs(startDate), 'days') > 7) {
        throw new Error(
          'You cannot list schedules in a period longer than 7 days.'
        )
      }

      query.where(
        and(
          gte(schedules.scheduledAt, startDate),
          lte(schedules.scheduledAt, endDate)
        )
      )
    }

    const schedulesList = await query

    return schedulesList
  }

  async findManyByStudentId(
    id: string,
    filters?: { teacherId?: string; startDate?: Date; endDate?: Date }
  ) {
    const query = db.select().from(schedules)

    if (filters?.teacherId) {
      query.where(eq(schedules.teacherId, filters.teacherId))
    }

    if (filters?.startDate || filters?.endDate) {
      const startDate = filters?.startDate
        ? dayjs(filters.startDate).startOf('day').toDate()
        : dayjs().subtract(7, 'days').startOf('day').toDate()

      const endDate = filters?.endDate
        ? dayjs(filters.endDate).endOf('day').toDate()
        : dayjs(startDate).add(7, 'days').endOf('day').toDate()

      if (dayjs(endDate).diff(dayjs(startDate), 'days') > 7) {
        throw new Error(
          'You cannot list schedules in a period longer than 7 days.'
        )
      }

      query.where(
        and(
          gte(schedules.scheduledAt, startDate),
          lte(schedules.scheduledAt, endDate)
        )
      )
    }

    const schedulesByStudentId = await query.where(eq(schedules.studentId, id))
    return schedulesByStudentId
  }

  async findManyByTeacherId(
    id: string,
    filters?: { studentId?: string; startDate?: Date; endDate?: Date }
  ) {
    const query = db.select().from(schedules)

    if (filters?.studentId) {
      query.where(eq(schedules.studentId, filters.studentId))
    }

    if (filters?.startDate || filters?.endDate) {
      const startDate = filters?.startDate
        ? dayjs(filters.startDate).startOf('day').toDate()
        : dayjs().subtract(7, 'days').startOf('day').toDate()

      const endDate = filters?.endDate
        ? dayjs(filters.endDate).endOf('day').toDate()
        : dayjs(startDate).add(7, 'days').endOf('day').toDate()

      if (dayjs(endDate).diff(dayjs(startDate), 'days') > 7) {
        throw new Error(
          'You cannot list schedules in a period longer than 7 days.'
        )
      }

      query.where(
        and(
          gte(schedules.scheduledAt, startDate),
          lte(schedules.scheduledAt, endDate)
        )
      )
    }

    const schedulesByTeacherId = await query.where(eq(schedules.teacherId, id))
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
