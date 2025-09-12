import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import dotenv from "dotenv";
import Event from "../models/Event";
import { connectDB } from "../config/db";

dotenv.config({ quiet: true });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI is required");

const csvFilePath = path.join(__dirname, "../data/events.csv");

const seedEvents = async () => {
  try {
    await connectDB(MONGO_URI);
    const events: Array<any> = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row: any) => {
        // Map CSV fields to Event model
        events.push({
          id_odsp: row.id_odsp,
          date: new Date(row.date),
          country: row.country,
          homeTeam: row.ht,
          awayTeam: row.at,
          league: row.league,
          price: Number(row.price),
          availableSeats: Number(row.available_seats),
        });
      })
      .on("end", async () => {
        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log(`✅ Seeded ${events.length} events`);
        process.exit(0);
      });
  } catch (err) {
    console.error("❌ Failed to seed events:", err);
    process.exit(1);
  }
};

seedEvents();
