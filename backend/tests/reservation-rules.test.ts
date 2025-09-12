import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import express from "express";

import { createTestUser, createTestEvent } from "../src/utils/factories";
import { reserveEvent } from "../src/controllers/eventController";

let mongoServer: MongoMemoryServer;
let app: express.Express;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });

  app = express();
  app.use(express.json());

  // Middleware to simulate authentication
  app.use((req, _res, next) => {
    const testUserId = (req.headers["x-test-user-id"] as string) || undefined;
    if (testUserId) {
      (req as any).userId = testUserId;
    }
    next();
  });

  // Route for reserving event spots
  app.post("/api/events/:id/reserve", reserveEvent);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe("Reservation rules", () => {
  test("Max 2 spots per user per event", async () => {
    const user = await createTestUser();
    const ev = await createTestEvent();

    await request(app)
      .post(`/api/events/${ev._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 2 })
      .expect(200);

    const res = await request(app)
      .post(`/api/events/${ev._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 1 });

    expect([400, 422]).toContain(res.status);
  });

  test("Max 5 spots across all events", async () => {
    const user = await createTestUser();
    const events = await Promise.all([createTestEvent(), createTestEvent(), createTestEvent(), createTestEvent()]);

    await request(app)
      .post(`/api/events/${events[0]._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 2 })
      .expect(200);

    await request(app)
      .post(`/api/events/${events[1]._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 2 })
      .expect(200);

    await request(app)
      .post(`/api/events/${events[2]._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 1 })
      .expect(200);

    await request(app)
      .post(`/api/events/${events[3]._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 1 })
      .expect(400);
  });
});
