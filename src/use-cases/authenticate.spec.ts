import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcrypt'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: await hash('hashed-123456', 6),
      role: 'student',
    })

    const { user } = await sut.execute({
      email: 'john.doe@example.com',
      password: 'hashed-123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
