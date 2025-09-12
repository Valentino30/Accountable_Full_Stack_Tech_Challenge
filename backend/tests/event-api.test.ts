import request from "supertest";
import express from "express";
import { createTestEvent } from "../src/utils/factories";
import { setupTestDB, dropTestDB, teardownTestDB } from "./utils/mongoTestUtils";
import { createTestApp } from "./utils/testApp";

let app: express.Express;

beforeAll(async () => {
  await setupTestDB();
  app = createTestApp();
});

afterAll(teardownTestDB);
beforeEach(dropTestDB);

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
