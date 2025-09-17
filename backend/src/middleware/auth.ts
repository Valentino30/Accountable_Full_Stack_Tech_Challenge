import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env'

export interface AuthRequest extends Request {
  userId?: string
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET) as { id: string }
    req.userId = decoded.id
    next()
  } catch {
    return res
      .status(401)
      .json({ error: 'Unauthorized: Invalid or expired token' })
  }
}
