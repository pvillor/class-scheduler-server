import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*',
  out: './src/drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: env.MYSQL_URL,
  },
} satisfies Config
