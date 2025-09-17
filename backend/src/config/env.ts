import dotenv from 'dotenv'
import path from 'path'

const envFile =
  process.env.NODE_ENV === 'test'
    ? path.resolve(process.cwd(), '.env.test')
    : path.resolve(process.cwd(), '.env')

dotenv.config({ path: envFile, override: true, quiet: true })

// ✅ base required vars
const baseRequired = ['ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET']

// ✅ add only in non-test
const required =
  process.env.NODE_ENV === 'test'
    ? baseRequired
    : [...baseRequired, 'MONGO_URI', 'PORT']

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing env var: ${key}`)
  }
})

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  HOST: process.env.HOST || '0.0.0.0',
  MONGO_URI: process.env.MONGO_URI || '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
}
