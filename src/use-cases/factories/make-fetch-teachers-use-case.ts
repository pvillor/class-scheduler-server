import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { FetchTeachersUseCase } from '../fetch-teachers'

export function makeFetchTeachersUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const createScheduleUseCase = new FetchTeachersUseCase(usersRepository)

  return createScheduleUseCase
}
