import express from 'express'
import cors from 'cors'
import { authenticate } from './middleware/auth'
import authRoutes from './routes/auth.routes'
import eventRoutes from './routes/event.routes'
import userRoutes from './routes/user.routes'

const app = express()
app.use(cors())
app.use(express.json())

// Dev-only request logging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
  })
}

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', authenticate, userRoutes)
app.use('/api/events', authenticate, eventRoutes)

export default app
