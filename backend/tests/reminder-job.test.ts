import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as emailService from "../src/utils/emailService";
import { sendEventReminders } from "../src/jobs/eventReminder.job";
import { createTestEvent, createTestUser } from "../src/utils/factories";
import { addDays, setHours } from "date-fns";

jest.mock("../src/utils/emailService");
const mockedEmailService = emailService as unknown as { sendEmail: jest.Mock };

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  mockedEmailService.sendEmail?.mockReset();
});

describe("Reminder job", () => {
  test("Sends emails for events ~2 days away", async () => {
    const user = await createTestUser({ email: "remind@example.com" });

    const twoDays = setHours(addDays(new Date(), 2), 12);

    await createTestEvent({
      name: "Soon Match",
      date: twoDays,
      reservations: [{ userId: user._id, spotsReserved: 1 }],
    });

    await sendEventReminders();

    expect(mockedEmailService.sendEmail).toHaveBeenCalled();
  });
});
