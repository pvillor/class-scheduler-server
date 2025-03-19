export class TeacherIdRequiredError extends Error {
  constructor() {
    super('Teacher ID is required for this role.')
  }
}
