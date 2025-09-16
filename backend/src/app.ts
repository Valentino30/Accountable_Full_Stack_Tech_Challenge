import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import { authenticate } from "./middleware/auth";

const app = express();
app.use(cors());
app.use(express.json());

// Dev-only request logging
if (process.env.NODE_ENV !== "production") {
  app.use((req, _, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/events", authenticate, eventRoutes);

export default app;
