import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { startCronJobs } from "./jobs/cron";
import app from "./app";

dotenv.config({ quiet: true });

// ---------------------
// ENV VALIDATION
// ---------------------
const requiredEnvs = ["MONGO_URI", "PORT", "JWT_SECRET"];
requiredEnvs.forEach((key) => {
  if (!process.env[key]) throw new Error(`❌ ${key} is required in environment variables`);
});

export const JWT_SECRET = process.env.JWT_SECRET as string;
const PORT = parseInt(process.env.PORT as string, 10);
const MONGO_URI = process.env.MONGO_URI as string;
const HOST = process.env.HOST || "0.0.0.0";
const NODE_ENV = process.env.NODE_ENV || "development";

// ---------------------
// START SERVER
// ---------------------
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Start cron jobs
    startCronJobs();
    console.log("🕒 Cron jobs started");

    // Start server
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server running on http://${HOST}:${PORT} [${NODE_ENV}]`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
