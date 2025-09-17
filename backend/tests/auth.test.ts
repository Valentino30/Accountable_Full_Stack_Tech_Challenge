import express from 'express'
import request from 'supertest'
import User from '../src/models/User'
import {
  seedTestUser,
  setupTestDB,
  teardownTestDB,
} from './utils/mongoTestUtils'
import { createTestApp } from './utils/testApp'

let app: express.Express
let seededUser: { id: string; email: string; password: string }

beforeAll(async () => {
  await setupTestDB()
  app = createTestApp()
})

afterAll(async () => {
  await teardownTestDB()
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.init()
  seededUser = await seedTestUser()
})

describe('POST /api/auth/register', () => {
  test('registers a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'newuser@example.com', password: 'Sup3r$ecretPa55word!' })
      .expect(201)

    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')

    const userInDb = await User.findOne({ email: 'newuser@example.com' })
    expect(userInDb).not.toBeNull()
  })

  test('fails when email already exists', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: seededUser.email, password: seededUser.password })
      .expect(400)

    expect(res.body.error).toMatch(/already registered/i)
  })
})
