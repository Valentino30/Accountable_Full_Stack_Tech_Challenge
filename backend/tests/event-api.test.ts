// tests/event-api.test.ts
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import request from "supertest";

import { getEvents, getEventById } from "../src/controllers/eventController";
import { createTestEvent } from "../src/utils/factories";

let mongoServer: MongoMemoryServer;
let app: express.Express;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test" });

  app = express();
  app.use(express.json());

  app.get("/events/:id", getEventById);
  app.get("/events", getEvents);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe("Events API", () => {
  test("GET /events/:id returns the event", async () => {
    const ev = await createTestEvent({ homeTeam: "Derby FC", awayTeam: "Rivals FC" });
    const res = await request(app).get(`/events/${ev._id}`).expect(200);
    expect(res.body.homeTeam).toBe("Derby FC");
    expect(res.body.awayTeam).toBe("Rivals FC");
  });

  test("GET /events filters by country, date, and team", async () => {
    const dateA = new Date("2030-01-01T12:00:00Z");
    const dateB = new Date("2030-02-02T12:00:00Z");

    await createTestEvent({ country: "Aland", date: dateA, homeTeam: "Alpha", awayTeam: "Omega" });
    await createTestEvent({ country: "Bland", date: dateB, homeTeam: "Gamma", awayTeam: "Beta" });

    const resCountry = await request(app).get("/events").query({ country: "Aland" }).expect(200);
    expect(resCountry.body[0].country).toBe("Aland");
    expect(resCountry.body[0].homeTeam).toBe("Alpha");

    const resDate = await request(app).get("/events").query({ date: "2030-01-01" }).expect(200);
    expect(resDate.body[0].homeTeam).toBe("Alpha");

    const resTeam = await request(app).get("/events").query({ awayTeam: "Beta" }).expect(200);
    expect(resTeam.body[0].awayTeam).toBe("Beta");
  });
});
