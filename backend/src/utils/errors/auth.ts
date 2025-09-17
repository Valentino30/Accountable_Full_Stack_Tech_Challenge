import { ApiError } from './base'

export class AuthenticationError extends ApiError {
  constructor(message: string = 'Invalid credentials') {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

export class TokenError extends ApiError {
  constructor(message: string = 'Invalid or expired refresh token') {
    super(message, 401)
    this.name = 'TokenError'
  }
}
