import { ApiError } from './base'

export class ValidationError extends ApiError {
  feedback?: any
  constructor(message: string, feedback?: any) {
    super(message, 400)
    this.name = 'ValidationError'
    this.feedback = feedback
  }
}
