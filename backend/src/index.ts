import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/football_events");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();
