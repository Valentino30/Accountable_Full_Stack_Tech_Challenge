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

describe("Reservation cancellation", () => {
  test("User can cancel a reservation", async () => {
    const user = await createTestUser();
    const ev = await createTestEvent();

    const initialAvailableSeats = ev.availableSeats;

    // Reserve 2 spots first
    await request(app)
      .post(`/api/events/${ev._id}/reserve`)
      .set("x-test-user-id", user._id.toString())
      .send({ spotsReserved: 2 })
      .expect(200);

    // Cancel the reservation
    const cancelRes = await request(app)
      .delete(`/api/events/${ev._id}/reserve`)
      .set("x-test-user-id", user._id.toString());

    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body).toHaveProperty("message", "Reservation canceled successfully");
    expect(cancelRes.body).toHaveProperty("availableSeats", initialAvailableSeats);
    expect(cancelRes.body).toHaveProperty("freedSpots", 2);

    // Try cancelling again, should fail
    const secondCancel = await request(app)
      .delete(`/api/events/${ev._id}/reserve`)
      .set("x-test-user-id", user._id.toString());

    expect(secondCancel.status).toBe(400);
    expect(secondCancel.body).toHaveProperty("error", "No reservation found for this user");
  });
});
