import request from "supertest";
import express from "express";
import { createTestUser, createTestEvent } from "../src/utils/factories";
import { setupTestDB, dropTestDB, teardownTestDB } from "./utils/mongoTestUtils";
import { createTestApp } from "./utils/testApp";

let app: express.Express;

beforeAll(async () => {
  await setupTestDB();
  app = createTestApp();
});

afterAll(teardownTestDB);
beforeEach(dropTestDB);

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
