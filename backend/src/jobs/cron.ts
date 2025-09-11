import cron from "node-cron";
import { sendEventReminders } from "./eventReminder.job";

export const startCronJobs = () => {
  // Currently set to run every one minute for testing purposes
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running reminder job...");
    try {
      await sendEventReminders();
    } catch (err) {
      console.error("❌ Reminder job failed:", err);
    }
  });
};
