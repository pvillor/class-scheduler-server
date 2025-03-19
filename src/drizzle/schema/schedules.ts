import { createId } from '@paralleldrive/cuid2'
import { mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { users } from './users'
import { datetime } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const schedules = mysqlTable('schedules', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$default(() => createId()),
  studentId: varchar('student_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  teacherId: varchar('teacher_id', { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  scheduledAt: datetime('scheduled_at').notNull(),
  status: mysqlEnum('status', [
    'pending',
    'canceled',
    'confirmed',
    'finished',
  ]).notNull(),
  createdAt: datetime('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
})
