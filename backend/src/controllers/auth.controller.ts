import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const tokens = await authService.registerUser(email, password)
    res.status(201).json(tokens)
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res
        .status(400)
        .json({ error: err.message, feedback: err.feedback })
    }
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email is already registered' })
    }
    console.error('registerUser error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const tokens = await authService.loginUser(email, password)
    res.json(tokens)
  } catch (err: any) {
    if (err.name === 'AuthenticationError') {
      return res.status(401).json({ error: err.message })
    }
    console.error('loginUser error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body
    if (!token) {
      return res.status(400).json({ error: 'Refresh token missing' })
    }

    const accessToken = await authService.refreshToken(token)
    res.json({ accessToken })
  } catch (err: any) {
    if (err.name === 'TokenError' || err.name === 'UserNotFoundError') {
      return res.status(401).json({ error: err.message })
    }
    console.error('refreshToken error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}
