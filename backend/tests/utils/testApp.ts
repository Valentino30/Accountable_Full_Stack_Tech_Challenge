import express from "express";
import { getCurrentUser } from "../../src/controllers/userController";
import { getEvents, getEventById, reserveEvent, cancelReservation } from "../../src/controllers/eventController";

export function createTestApp() {
  const app = express();
  app.use(express.json());

  // --- fake auth middleware for testing ---
  app.use((req, _res, next) => {
    const testUserId = req.headers["x-test-user-id"] as string;
    if (testUserId) {
      (req as any).userId = testUserId;
    }
    next();
  });

  const router = express.Router();

  // Event routes
  router.get("/events", getEvents);
  router.get("/events/:id", getEventById);
  router.post("/events/:id/reserve", reserveEvent);
  router.delete("/events/:id/reserve", cancelReservation);

  // User routes
  router.get("/users/me", getCurrentUser);

  // Mount with /api prefix
  app.use("/api", router);

  return app;
}
