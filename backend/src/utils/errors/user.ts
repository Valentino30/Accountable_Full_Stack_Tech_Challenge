import { ApiError } from './base'

export class UserNotFoundError extends ApiError {
  constructor(message: string = 'User not found') {
    super(message, 404)
    this.name = 'UserNotFoundError'
  }
}
