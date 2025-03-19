export class StudentIdRequiredError extends Error {
  constructor() {
    super('Student ID is required for this role.')
  }
}
