import { Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import * as userService from '../services/user.service'
import { handleError } from '../utils/errors'
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
    handleError(err, res)
  }
}
