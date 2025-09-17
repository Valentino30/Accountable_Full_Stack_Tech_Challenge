import { addDays, setHours } from 'date-fns'
import { sendEventReminders } from '../src/jobs/eventReminder.job'
import { createTestEvent, createTestUser } from '../src/utils/factories'
import { mockedEmailService } from './utils/mockEmail'
import { dropTestDB, setupTestDB, teardownTestDB } from './utils/mongoTestUtils'

beforeAll(setupTestDB)
afterAll(teardownTestDB)

beforeEach(async () => {
  await dropTestDB()
  mockedEmailService.sendEmail.mockReset()
})

describe('Reminder job', () => {
  test('Sends emails for events ~2 days away', async () => {
    const user = await createTestUser({ email: 'remind@example.com' })
    const twoDays = setHours(addDays(new Date(), 2), 12)

    await createTestEvent({
      date: twoDays,
      reservations: [{ userId: user._id, spotsReserved: 1 }],
    })

    await sendEventReminders()

    expect(mockedEmailService.sendEmail).toHaveBeenCalled()
  })
})
