// src/utils/factories.ts
import EventModel from "../../src/models/Event";
import UserModel from "../../src/models/User";

export async function createTestUser(overrides: Partial<any> = {}) {
  const defaults = {
    email: `user${Date.now()}@example.com`,
    name: "Test User",
    password: "test1234",
    reservations: [],
  };
  return await UserModel.create({ ...defaults, ...overrides });
}

export async function createTestEvent(overrides: Partial<any> = {}) {
  const defaults = {
    id_odsp: `event-${Date.now()}`,
    homeTeam: "Team A",
    awayTeam: "Team B",
    country: "NowhereLand",
    league: "Test League",
    date: new Date(),
    price: 20,
    availableSeats: 100,
    reservations: [],
  };
  return await EventModel.create({ ...defaults, ...overrides });
}
