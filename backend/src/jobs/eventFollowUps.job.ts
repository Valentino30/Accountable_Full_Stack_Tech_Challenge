import { addDays, startOfDay, endOfDay } from "date-fns";
import Event, { IReservation } from "../models/Event";
import { sendEmail } from "../utils/emailService";
import { IUser } from "../models/User";

export const sendEventFollowUps = async (): Promise<void> => {
  const now = new Date();
  const yesterday = addDays(now, -1);

  const events = await Event.find({
    date: {
      $gte: startOfDay(yesterday),
      $lt: endOfDay(yesterday),
    },
  }).populate<{ reservations: (Omit<IReservation, "userId"> & { userId: IUser })[] }>("reservations.userId");

  const followUps = events.flatMap((event) =>
    event.reservations.map((reservation) => ({
      event,
      user: reservation.userId,
    }))
  );

  for (const { event, user } of followUps) {
    if (!("email" in user)) continue;

    await sendEmail(
      user.email,
      `Thanks for attending: ${event.homeTeam} vs ${event.awayTeam}`,
      `We hope you enjoyed the match in ${event.country} (${event.league}). We'd love to hear your feedback!`
    );
  }
};
