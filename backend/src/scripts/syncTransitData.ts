/**
 * @author Jack Buchholzer
 * Sync script -- pulls real stop and route data from the Winnipeg Transit API
 *
 * Run this locally to populate the database:
 *   npx tsx backend/src/scripts/syncTransitData.ts
 *
 * Or trigger it from the API:
 *   POST /api/transit/sync
 */

import "dotenv/config"
import { syncStopsAndRoutes } from "../services/transitService"

async function main() {
  console.log("Starting Winnipeg Transit data sync...")

  try {
    const result = await syncStopsAndRoutes()
    console.log(`Done! Synced ${result.stopsCount} stops and ${result.routesCount} routes.`)
  } catch (err) {
    console.error("Sync failed:", err)
    process.exit(1)
  }

  process.exit(0)
}

main()
