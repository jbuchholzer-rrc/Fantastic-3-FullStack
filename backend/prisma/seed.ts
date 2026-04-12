/**
 * @author Jack Buchholzer
 * Database seed script
 *
 * Creates tables if they don't exist and seeds some initial data.
 * Runs during Vercel build so the database is ready for the app.
 * Safe to run multiple times -- skips seeding if data already exists.
 */

import { Pool } from "pg"

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.log("No DATABASE_URL set, skipping seed.")
  process.exit(0)
}

const pool = new Pool({ connectionString: databaseUrl })

async function seed() {
  const client = await pool.connect()

  try {
    // create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Stop" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "latitude" DOUBLE PRECISION NOT NULL,
        "longitude" DOUBLE PRECISION NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "Bus" (
        "id" SERIAL PRIMARY KEY,
        "routeNumber" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "nextStop" TEXT NOT NULL,
        "eta" INTEGER NOT NULL,
        "status" TEXT NOT NULL,
        "favorite" BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE IF NOT EXISTS "Trip" (
        "id" SERIAL PRIMARY KEY,
        "origin" TEXT NOT NULL,
        "destination" TEXT NOT NULL,
        "route" TEXT NOT NULL,
        "departureTime" TEXT NOT NULL,
        "arrivalTime" TEXT NOT NULL,
        "duration" INTEGER NOT NULL,
        "fare" DOUBLE PRECISION NOT NULL,
        "status" TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "TransitStop" (
        "id" SERIAL PRIMARY KEY,
        "key" INTEGER NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "latitude" DOUBLE PRECISION NOT NULL,
        "longitude" DOUBLE PRECISION NOT NULL,
        "direction" TEXT,
        "street" TEXT,
        "syncedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS "TransitRoute" (
        "id" SERIAL PRIMARY KEY,
        "key" INTEGER NOT NULL UNIQUE,
        "number" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "coverageType" TEXT,
        "badgeLabel" TEXT,
        "badgeStyle" TEXT,
        "syncedAt" TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `)

    // check if there's already data
    const trips = await client.query('SELECT COUNT(*) FROM "Trip"')
    if (Number(trips.rows[0].count) > 0) {
      console.log("Database already has data, skipping seed.")
      return
    }

    // seed some initial trips
    await client.query(`
      INSERT INTO "Trip" ("origin", "destination", "route", "departureTime", "arrivalTime", "duration", "fare", "status")
      VALUES
        ('Portage & Main', 'U of M', 'BLUE', '8:00 AM', '8:35 AM', 35, 3.15, 'scheduled'),
        ('The Forks', 'Polo Park', '11', '9:15 AM', '9:40 AM', 25, 3.15, 'scheduled'),
        ('Osborne Village', 'HSC', '36', '7:30 AM', '7:45 AM', 15, 3.15, 'completed'),
        ('U of M', 'St Vital Centre', '75', '12:00 PM', '12:20 PM', 20, 3.15, 'scheduled'),
        ('Kildonan Place', 'Portage & Main', '47', '6:45 AM', '7:15 AM', 30, 3.15, 'in-progress')
    `)

    // seed some initial buses
    await client.query(`
      INSERT INTO "Bus" ("routeNumber", "destination", "nextStop", "eta", "status")
      VALUES
        ('BLUE', 'Downtown', 'Portage & Main', 5, 'On Time'),
        ('60', 'Waverley', 'Taylor Ave', 8, 'Delayed'),
        ('16', 'St Vital', 'Main St', 3, 'On Time')
    `)

    // seed some initial stops
    await client.query(`
      INSERT INTO "Stop" ("name", "latitude", "longitude")
      VALUES
        ('Downtown', 49.8951, -97.1384),
        ('The Forks', 49.8889, -97.1313),
        ('University of Manitoba', 49.8094, -97.1327)
    `)

    console.log("Database seeded successfully.")
  } catch (err) {
    console.error("Seed error:", err)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
