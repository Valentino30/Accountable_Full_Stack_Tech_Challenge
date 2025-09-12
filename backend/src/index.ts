import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { startCronJobs } from "./jobs/cron";
import app from "./app";

dotenv.config({ quiet: true });

// Validate MONGO_URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is required in environment variables");
}
// Validate PORT
const PORT_STR = process.env.PORT;
if (!PORT_STR) {
  throw new Error("❌ PORT is required in environment variables");
}
const PORT = parseInt(PORT_STR, 10);

// Validate JWT_SECRET
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is required in environment variables");
}
export const JWT_SECRET = process.env.JWT_SECRET;

// Start server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log(`✅ Connected to MongoDB`);
    // run scheduled jobs in background
    startCronJobs();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

start();
