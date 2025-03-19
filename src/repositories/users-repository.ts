import type { CreateUser, User } from '../interfaces/user'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findManyTeachers(): Promise<User[]>
  create(data: CreateUser): Promise<User>
}
