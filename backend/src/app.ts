import express from 'express'
import cors from 'cors'
import { authenticate } from './middleware/auth'
import authRoutes from './routes/authRoutes'
import eventRoutes from './routes/eventRoutes'
import userRoutes from './routes/userRoutes'

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
