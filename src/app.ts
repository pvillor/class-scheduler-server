import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)

app.register(appRoutes)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'class.scheduler',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
