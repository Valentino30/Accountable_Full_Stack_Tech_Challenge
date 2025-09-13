import express from "express";
import { getEvents, getEventById, reserveEvent, cancelReservation } from "../../src/controllers/eventController";

export function createTestApp() {
  const app = express();
  app.use(express.json());

  // fake auth middleware
  app.use((req, _res, next) => {
    const testUserId = (req.headers["x-test-user-id"] as string) || undefined;
    if (testUserId) {
      (req as any).userId = testUserId;
    }
    next();
  });

  // routes
  app.get("/events", getEvents);
  app.get("/events/:id", getEventById);
  app.post("/api/events/:id/reserve", reserveEvent);
  app.delete("/api/events/:id/reserve", cancelReservation);

  return app;
}
