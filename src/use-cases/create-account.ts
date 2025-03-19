import { hash } from 'bcrypt'
import type { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

export interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
  role: 'student' | 'teacher' | 'admin'
}

export class CreateAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role = 'student',
  }: CreateAccountUseCaseRequest) {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      role,
    })

    return { user }
  }
}
