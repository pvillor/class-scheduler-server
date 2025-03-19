import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateAccountUseCase } from './create-account'

let usersRepository: InMemoryUsersRepository
let sut: CreateAccountUseCase

describe('Create Account Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateAccountUseCase(usersRepository)
  })

  it('should be able to create account', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
      role: 'student',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
