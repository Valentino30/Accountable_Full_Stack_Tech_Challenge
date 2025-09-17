export class ValidationError extends Error {
  feedback?: any
  constructor(message: string, feedback?: any) {
    super(message)
    this.name = 'ValidationError'
    this.feedback = feedback
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = 'Invalid credentials') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export class TokenError extends Error {
  constructor(message: string = 'Invalid or expired refresh token') {
    super(message)
    this.name = 'TokenError'
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found') {
    super(message)
    this.name = 'UserNotFoundError'
  }
}
