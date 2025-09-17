import Event from '../../src/models/Event'
import User from '../../src/models/User'

function createUniqueId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export async function createTestUser(overrides: Partial<any> = {}) {
  const defaults = {
    email: `user${createUniqueId()}@example.com`,
    name: 'Test User',
    password: 'test1234',
    reservations: [],
  }
  return await User.create({ ...defaults, ...overrides })
}

export async function createTestEvent(overrides: Partial<any> = {}) {
  const defaults = {
    id_odsp: `event-${createUniqueId()}`,
    homeTeam: 'Team A',
    awayTeam: 'Team B',
    country: 'NowhereLand',
    league: 'Test League',
    date: new Date(),
    price: 20,
    availableSeats: 100,
    reservations: [],
  }
  return await Event.create({ ...defaults, ...overrides })
}
