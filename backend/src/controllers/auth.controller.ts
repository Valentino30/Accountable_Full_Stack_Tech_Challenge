import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { handleError } from '../utils/errors'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const tokens = await authService.registerUser(email, password)
    res.status(201).json(tokens)
  } catch (err: any) {
    handleError(err, res)
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const tokens = await authService.loginUser(email, password)
    res.json(tokens)
  } catch (err: any) {
    handleError(err, res)
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
    handleError(err, res)
  }
}
