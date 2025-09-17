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

afterAll(teardownTestDB)

afterEach(async () => {
  await User.deleteMany({})
})

beforeEach(async () => {
  seededUser = await seedTestUser()
})

describe('Users API - GET /api/users/me', () => {
  it('returns current user successfully', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('x-test-user-id', seededUser.id)
      .expect(200)

    expect(res.body.userId).toBe(seededUser.id)
    expect(res.body.email).toBe(seededUser.email)
  })

  it('returns 401 if user ID header is missing', async () => {
    const res = await request(app).get('/api/users/me').expect(401)
    expect(res.body.error).toBe('Unauthorized')
  })

  it('returns 404 if user does not exist', async () => {
    await User.deleteMany({})
    const fakeUserId = '507f1f77bcf86cd799439011'
    const res = await request(app)
      .get('/api/users/me')
      .set('x-test-user-id', fakeUserId)
      .expect(404)

    expect(res.body.error).toBe('User not found')
  })
})
