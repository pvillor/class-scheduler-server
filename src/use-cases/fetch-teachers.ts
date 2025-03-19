import type { UsersRepository } from '../repositories/users-repository'

export class FetchTeachersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    const teachers = await this.usersRepository.findManyTeachers()

    return teachers
  }
}
