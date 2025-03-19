import type { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account'
import { authenticate } from './controllers/authenticate'
import { refresh } from './controllers/refresh'
import { createSchedule } from './controllers/create-schedule'
import { auth } from './middlewares/auth'
import { fetchSchedules } from './controllers/fetch-schedules'
import { signOut } from './controllers/sign-out'
import { getProfile } from './controllers/get-profile'
import { fetchTeachers } from './controllers/fetch-teachers'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createAccount)

  app.register(auth).get('/me', getProfile)

  app.post('/sessions', authenticate)
  app.register(auth).delete('/sessions', signOut)

  app.patch('/token/refresh', refresh)

  app.register(auth).post('/schedules', createSchedule)
  app.register(auth).get('/schedules', fetchSchedules)

  app.register(auth).get('/teachers', fetchTeachers)
}
