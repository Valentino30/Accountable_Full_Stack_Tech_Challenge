import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";

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

export default app;
