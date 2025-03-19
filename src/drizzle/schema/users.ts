import { createId } from '@paralleldrive/cuid2'
import { mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .$default(() => createId()),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['student', 'teacher', 'admin']).notNull(),
})
