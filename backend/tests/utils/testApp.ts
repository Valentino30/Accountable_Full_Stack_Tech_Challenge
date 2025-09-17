import express from 'express'
import {
  loginUser,
  refreshToken,
  registerUser,
} from '../../src/controllers/authController'
import {
  cancelReservation,
  getEventById,
  getEvents,
  reserveEvent,
} from '../../src/controllers/eventController'
import { getCurrentUser } from '../../src/controllers/userController'

export function createTestApp() {
  const app = express()
  app.use(express.json())

  // --- fake auth middleware for testing ---
  app.use((req, _res, next) => {
    const testUserId = req.headers['x-test-user-id'] as string
    if (testUserId) {
      ;(req as any).userId = testUserId
    }
    next()
  })

  const router = express.Router()

  // Auth routes
  router.post('/auth/login', loginUser)
  router.post('/auth/register', registerUser)
  router.post('/auth/refresh-token', refreshToken)

  // User routes
  router.get('/users/me', getCurrentUser)

  // Event routes
  router.get('/events', getEvents)
  router.get('/events/:id', getEventById)
  router.post('/events/:id/reserve', reserveEvent)
  router.delete('/events/:id/reserve', cancelReservation)

  // Mount everything with /api prefix
  app.use('/api', router)

  return app
}
