import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import zxcvbn from 'zxcvbn'
import { ENV } from '../config/env'
import User from '../models/User'
import {
  AuthenticationError,
  TokenError,
  UserNotFoundError,
  ValidationError,
} from '../utils/auth-errors'
import { generateAccessTokenOnly, generateTokens } from '../utils/token-utils'

export const registerUser = async (email: string, password: string) => {
  // Check password strength
  const strength = zxcvbn(password)
  if (strength.score < 3) {
    throw new ValidationError('Password is too weak', strength.feedback)
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed })

  // Generate and return tokens
  return generateTokens(user._id.toString())
}

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError()
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw new AuthenticationError()
  }

  return generateTokens(user._id.toString())
}

export const refreshToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, ENV.REFRESH_TOKEN_SECRET) as {
      id: string
    }

    const user = await User.findById(payload.id)
    if (!user) {
      throw new UserNotFoundError()
    }

    return generateAccessTokenOnly(user._id.toString())
  } catch (err: any) {
    throw new TokenError()
  }
}
