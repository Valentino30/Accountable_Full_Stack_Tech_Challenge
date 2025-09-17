import { addDays, endOfDay, startOfDay } from 'date-fns'
import Event, { IReservation } from '../models/Event'
import { IUser } from '../models/User'
import { sendEmail } from '../utils/email'

export const sendEventReminders = async (): Promise<void> => {
  const now = new Date()
  const twoDaysFromNow = addDays(now, 2)

  const events = await Event.find({
    date: {
      $gte: startOfDay(twoDaysFromNow),
      $lt: endOfDay(twoDaysFromNow),
    },
  }).populate<{
    reservations: (Omit<IReservation, 'userId'> & { userId: IUser })[]
  }>('reservations.userId')

  const reminders = events.flatMap((event) =>
    event.reservations.map((reservation) => ({
      event,
      user: reservation.userId,
    }))
  )

  for (const { event, user } of reminders) {
    if (!('email' in user)) continue

    await sendEmail(
      user.email,
      `Reminder: ${event.homeTeam} vs ${event.awayTeam}`,
      `Your reserved event is happening on ${event.date.toDateString()} in ${event.country} (${event.league}).`
    )
  }
}
