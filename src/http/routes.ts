import type { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account'
import { authenticate } from './controllers/authenticate'
import { refresh } from './controllers/refresh'
import { createSchedule } from './controllers/create-schedule'
import { auth } from './middlewares/auth'
import { fetchSchedules } from './controllers/fetch-schedules'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createAccount)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.register(auth).post('/schedules', createSchedule)
  app.register(auth).get('/schedules', fetchSchedules)
}
