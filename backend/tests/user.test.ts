import request from "supertest";
import express from "express";
import { setupTestDB, dropTestDB, teardownTestDB, seedTestUser } from "./utils/mongoTestUtils";
import { createTestApp } from "./utils/testApp";

let app: express.Express;
let userId: string;

beforeAll(async () => {
  await setupTestDB();
  app = createTestApp();
});

afterAll(teardownTestDB);

beforeEach(async () => {
  await dropTestDB();
  userId = await seedTestUser({ email: "test@example.com", password: "hashedpassword" });
});

describe("Users API - GET /api/users/me", () => {
  it("returns current user successfully", async () => {
    const res = await request(app).get("/api/users/me").set("x-test-user-id", userId).expect(200);

    expect(res.body.userId).toBe(userId);
    expect(res.body.email).toBe("test@example.com");
  });

  it("returns 401 if user ID header is missing", async () => {
    const res = await request(app).get("/api/users/me").expect(401);
    expect(res.body.error).toBe("Unauthorized");
  });

  it("returns 404 if user does not exist", async () => {
    const fakeUserId = "507f1f77bcf86cd799439011"; // valid ObjectId, not in DB
    const res = await request(app).get("/api/users/me").set("x-test-user-id", fakeUserId).expect(404);

    expect(res.body.error).toBe("User not found");
  });
});
