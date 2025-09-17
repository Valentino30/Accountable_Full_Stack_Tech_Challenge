import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as userService from '../services/user.service'
import { AuthenticationError } from '../utils/errors/auth'
import { UserNotFoundError } from '../utils/errors/user'

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req

    if (!userId) {
      throw new AuthenticationError('Unauthorized')
    }

    const user = await userService.getUserById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    res.json({ userId: user._id.toString(), email: user.email })
  } catch (err: any) {
    console.error('getCurrentUser error:', err)
    if (err instanceof AuthenticationError) {
      return res.status(401).json({ error: err.message })
    }
    if (err instanceof UserNotFoundError) {
      return res.status(404).json({ error: err.message })
    }
    res.status(500).json({ error: 'Server error' })
  }
}
