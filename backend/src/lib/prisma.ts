import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.")
  }

  const pool = new Pool({
    connectionString: databaseUrl,
  })

  return new PrismaClient({
    adapter: new PrismaPg(pool),
  })
}

const prisma = createPrismaClient()

export default prisma
