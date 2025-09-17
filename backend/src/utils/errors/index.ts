import { Response } from 'express'

export const handleError = (err: any, res: Response) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message, feedback: err.feedback })
  }
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Email is already registered' })
  }
  if (err.name === 'AuthenticationError') {
    return res.status(401).json({ error: err.message })
  }
  if (err.name === 'TokenError') {
    return res.status(401).json({ error: err.message })
  }
  if (err.name === 'UserNotFoundError') {
    return res.status(404).json({ error: 'User not found' })
  }
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }

  return res.status(500).json({ error: 'Server error' })
}
