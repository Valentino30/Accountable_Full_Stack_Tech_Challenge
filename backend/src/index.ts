import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Dev-only request logging
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// Validate required environment variables
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is required in environment variables");
}

const PORT_STR = process.env.PORT;
if (!PORT_STR) {
  throw new Error("❌ PORT is required in environment variables");
}

const PORT = parseInt(PORT_STR, 10);

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is required in environment variables");
}
export const JWT_SECRET = process.env.JWT_SECRET;

// Start server
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log(`✅ Connected to MongoDB`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

start();
