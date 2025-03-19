import type { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account'
import { authenticate } from './controllers/authenticate'
import { refresh } from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createAccount)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
