import { eq } from 'drizzle-orm'
import { db } from '../../drizzle/client'
import { users } from '../../drizzle/schema/users'
import type { CreateUser, User } from '../../interfaces/user'
import type { UsersRepository } from '../users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async findById(id: string) {
    const [user] = await db.select().from(users).where(eq(users.id, id))

    return user
  }

  async findByEmail(email: string) {
    const [user] = await db.select().from(users).where(eq(users.email, email))

    return user
  }

  async create({ name, email, passwordHash, role }: CreateUser) {
    const [result] = await db
      .insert(users)
      .values({
        name,
        email,
        passwordHash,
        role,
      })
      .$returningId()

    const userId = result.id

    const [user] = await db.select().from(users).where(eq(users.id, userId))

    return user
  }
}
