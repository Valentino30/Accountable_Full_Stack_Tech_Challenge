import * as emailService from "../../src/utils/emailService";

jest.mock("../../src/utils/emailService");

export const mockedEmailService = emailService as unknown as {
  sendEmail: jest.Mock;
};
