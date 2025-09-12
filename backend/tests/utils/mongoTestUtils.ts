import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

export async function setupTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { dbName: "test" });
}

export async function dropTestDB() {
  await mongoose.connection.dropDatabase();
}

export async function teardownTestDB() {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
}
