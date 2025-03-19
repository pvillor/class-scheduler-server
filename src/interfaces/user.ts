export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: 'student' | 'teacher' | 'admin'
}

export interface CreateUser {
  name: string
  email: string
  passwordHash: string
  role: 'student' | 'teacher' | 'admin'
}
