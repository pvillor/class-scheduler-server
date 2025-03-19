import type { CreateUser, User } from '../interfaces/user'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: CreateUser): Promise<User>
}
