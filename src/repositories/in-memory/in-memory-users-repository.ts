import type { User, CreateUser } from '../../interfaces/user'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({ name, email, passwordHash, role }: CreateUser) {
    const user = {
      id: 'user-1',
      name,
      email,
      passwordHash,
      role,
    }

    this.items.push(user)

    return user
  }
}
