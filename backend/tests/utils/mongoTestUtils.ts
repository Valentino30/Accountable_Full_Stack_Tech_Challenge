import bcrypt from 'bcryptjs'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import User from '../../src/models/User'

let mongoServer: MongoMemoryServer

export async function setupTestDB() {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri, { dbName: 'test' })
}

export async function dropTestDB() {
  await mongoose.connection.dropDatabase()
}

export async function teardownTestDB() {
  await mongoose.disconnect()
  if (mongoServer) await mongoServer.stop()
}

export async function seedTestUser(overrides: Partial<any> = {}): Promise<any> {
  const plainPassword = overrides.password || 'Sup3r$ecretPa55word!'
  const hashed = await bcrypt.hash(plainPassword, 10)

  const user = await User.create({
    email: overrides.email || 'user@example.com',
    password: hashed,
  })

  return {
    id: user._id.toString(),
    email: user.email,
    password: plainPassword,
  }
}
