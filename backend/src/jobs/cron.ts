import cron from "node-cron";
import { sendEventReminders } from "./eventReminder.job";
import { sendEventFollowUps } from "./eventFollowUps.job";

export const startCronJobs = () => {
  // Reminders (2 days before) → 9 AM daily
  cron.schedule("0 9 * * *", async () => {
    console.log("⏰ Running reminder job...");
    await sendEventReminders();
  });

  // Follow-ups (1 day after) → 10 AM daily
  cron.schedule("0 10 * * *", async () => {
    console.log("📨 Running follow-up job...");
    await sendEventFollowUps();
  });
};
