import { DrizzleSchedulesRepository } from '../../repositories/drizzle/drizzle-schedules-repository'
import { DrizzleUsersRepository } from '../../repositories/drizzle/drizzle-users-repository'
import { CreateScheduleUseCase } from '../create-schedule'

export function makeCreateScheduleUseCase() {
  const schedulesRepository = new DrizzleSchedulesRepository()
  const usersRepository = new DrizzleUsersRepository()
  const createScheduleUseCase = new CreateScheduleUseCase(
    schedulesRepository,
    usersRepository
  )

  return createScheduleUseCase
}
