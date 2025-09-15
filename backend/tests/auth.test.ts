import request from "supertest";
import express from "express";
import { setupTestDB, dropTestDB, teardownTestDB, seedTestUser } from "./utils/mongoTestUtils";
import { createTestApp } from "./utils/testApp";
import User from "../src/models/User";

let app: express.Express;
let seededUser: { id: string; email: string; password: string };

beforeAll(async () => {
  await setupTestDB();
  app = createTestApp();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(async () => {
  await teardownTestDB();
  (console.error as jest.Mock).mockRestore();
});

beforeEach(async () => {
  await dropTestDB();
  // Ensure MongoDB indexes are created, especially the unique index on email.
  // Without this, duplicate email inserts in tests might not throw an error,
  // causing the "fails when email already exists" test to incorrectly pass.
  await User.init();
  seededUser = await seedTestUser();
});

describe("POST /api/auth/register", () => {
  test("registers a new user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "newuser@example.com", password: "Sup3r$ecretPa55word!" })
      .expect(201);

    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    const userInDb = await User.findOne({ email: "newuser@example.com" });
    expect(userInDb).not.toBeNull();
  });

  test("fails when email already exists", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: seededUser.email, password: seededUser.password })
      .expect(400);

    expect(res.body.error).toMatch(/already registered/i);
  });
});

describe("POST /api/auth/login", () => {
  test("logs in successfully with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: seededUser.email, password: seededUser.password })
      .expect(200);

    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  test("fails with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: seededUser.email, password: "wrongpassword" })
      .expect(401);

    expect(res.body.error).toMatch(/invalid/i);
  });
});

describe("POST /api/auth/refresh-token", () => {
  test("returns a new token when given a valid refresh token", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: seededUser.email, password: seededUser.password })
      .expect(200);

    const refreshToken = loginRes.body.refreshToken;

    const res = await request(app).post("/api/auth/refresh-token").send({ token: refreshToken }).expect(200);

    expect(res.body).toHaveProperty("accessToken");
  });

  test("fails with invalid refresh token", async () => {
    const res = await request(app).post("/api/auth/refresh-token").send({ token: "garbage-token" }).expect(401);

    expect(res.body.error).toMatch(/invalid/i);
  });
});
