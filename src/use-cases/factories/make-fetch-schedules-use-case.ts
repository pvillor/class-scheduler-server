import { DrizzleSchedulesRepository } from '../../repositories/drizzle/drizzle-schedules-repository'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { FetchSchedulesUseCase } from '../fetch-schedules'

export function makeFetchSchedulesUseCase() {
  const schedulesRepository = new DrizzleSchedulesRepository()
  const usersRepository = new DrizzleUsersRepository()
  const createScheduleUseCase = new FetchSchedulesUseCase(
    schedulesRepository,
    usersRepository
  )

  return createScheduleUseCase
}
