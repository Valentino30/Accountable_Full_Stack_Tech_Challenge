import * as emailService from '../../src/utils/email'

jest.mock('../../src/utils/emailService')

export const mockedEmailService = emailService as unknown as {
  sendEmail: jest.Mock
}
