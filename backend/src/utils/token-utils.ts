import jwt from 'jsonwebtoken'
import { ENV } from '../config/env'

const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
}

export const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId)
  const refreshToken = generateRefreshToken(userId)
  return { accessToken, refreshToken }
}

export const generateAccessTokenOnly = (userId: string) => {
  return generateAccessToken(userId)
}
