import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { CreateAccountUseCase } from '../create-account'

export function makeCreateAccountUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const createAccountUseCase = new CreateAccountUseCase(usersRepository)

  return createAccountUseCase
}
