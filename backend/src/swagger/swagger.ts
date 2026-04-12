/**
 * @author Jack Buchholzer
 * Swagger/OpenAPI spec for the API documentation
 *
 * writing the spec directly instead of scanning JSDoc comments
 * because vercel serverless cant find the route files at runtime
 */

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Winnipeg Transit Tracker API",
    version: "1.0.0",
    description: "Backend API for the Winnipeg Transit Tracker app. Includes CRUD endpoints for buses, trips, and stops, plus a proxy to the Winnipeg Transit Open Data API for live schedules, route data, and trip planning.",
  },
  servers: [{ url: "/", description: "Current server" }],
  tags: [
    { name: "Buses", description: "CRUD for tracked buses (Harsh)" },
    { name: "Trips", description: "CRUD for saved trips (Jack)" },
    { name: "Stops", description: "CRUD for custom stops (Khush)" },
    { name: "Transit", description: "Winnipeg Transit API proxy (Jack)" },
  ],
  paths: {
    // ---- Buses ----
    "/api/buses": {
      get: {
        summary: "Get all buses",
        tags: ["Buses"],
        responses: { 200: { description: "List of all tracked buses" } },
      },
      post: {
        summary: "Create a new bus",
        tags: ["Buses"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["routeNumber", "destination", "nextStop", "eta", "status"],
                properties: {
                  routeNumber: { type: "string" },
                  destination: { type: "string" },
                  nextStop: { type: "string" },
                  eta: { type: "integer" },
                  status: { type: "string", enum: ["On Time", "Delayed"] },
                  favorite: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Bus created" } },
      },
    },
    "/api/buses/{id}": {
      get: {
        summary: "Get a bus by ID",
        tags: ["Buses"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Bus found" }, 404: { description: "Not found" } },
      },
      patch: {
        summary: "Update a bus",
        tags: ["Buses"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Bus updated" } },
      },
      delete: {
        summary: "Delete a bus",
        tags: ["Buses"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 204: { description: "Bus deleted" } },
      },
    },

    // ---- Trips ----
    "/api/trips": {
      get: {
        summary: "Get all saved trips",
        tags: ["Trips"],
        responses: { 200: { description: "List of saved trips" } },
      },
      post: {
        summary: "Create a new trip",
        tags: ["Trips"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["origin", "destination", "route", "departureTime", "arrivalTime", "duration", "fare", "status"],
                properties: {
                  origin: { type: "string" },
                  destination: { type: "string" },
                  route: { type: "string" },
                  departureTime: { type: "string" },
                  arrivalTime: { type: "string" },
                  duration: { type: "integer" },
                  fare: { type: "number" },
                  status: { type: "string", enum: ["scheduled", "in-progress", "completed", "cancelled"] },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Trip created" } },
      },
    },
    "/api/trips/{id}": {
      get: {
        summary: "Get a trip by ID",
        tags: ["Trips"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Trip found" }, 404: { description: "Not found" } },
      },
      patch: {
        summary: "Update a trip",
        tags: ["Trips"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Trip updated" } },
      },
      delete: {
        summary: "Delete a trip",
        tags: ["Trips"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 204: { description: "Trip deleted" } },
      },
    },

    // ---- Stops ----
    "/stops": {
      get: {
        summary: "Get all custom stops",
        tags: ["Stops"],
        responses: { 200: { description: "List of user-created stops" } },
      },
      post: {
        summary: "Create a custom stop",
        tags: ["Stops"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "latitude", "longitude"],
                properties: {
                  name: { type: "string" },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Stop created" } },
      },
    },
    "/stops/{id}": {
      delete: {
        summary: "Delete a custom stop",
        tags: ["Stops"],
        parameters: [{ in: "path", name: "id", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Stop deleted" } },
      },
    },

    // ---- Transit API Proxy ----
    "/api/transit/stops": {
      get: {
        summary: "Get all cached transit stops",
        tags: ["Transit"],
        description: "Returns stops synced from the Winnipeg Transit API",
        responses: { 200: { description: "List of transit stops" } },
      },
    },
    "/api/transit/stops/nearby": {
      get: {
        summary: "Find stops near a location",
        tags: ["Transit"],
        description: "Live call to the Winnipeg Transit API",
        parameters: [
          { in: "query", name: "lat", required: true, schema: { type: "number" } },
          { in: "query", name: "lon", required: true, schema: { type: "number" } },
          { in: "query", name: "distance", schema: { type: "integer", default: 500 } },
        ],
        responses: { 200: { description: "Nearby stops" } },
      },
    },
    "/api/transit/stops/{stopKey}": {
      get: {
        summary: "Get a transit stop by key",
        tags: ["Transit"],
        parameters: [{ in: "path", name: "stopKey", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Stop found" }, 404: { description: "Not found" } },
      },
    },
    "/api/transit/schedule/{stopKey}": {
      get: {
        summary: "Get live bus schedule for a stop",
        tags: ["Transit"],
        description: "Real-time arriving buses and ETAs from Winnipeg Transit",
        parameters: [{ in: "path", name: "stopKey", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Live schedule" }, 502: { description: "Transit API unavailable" } },
      },
    },
    "/api/transit/routes": {
      get: {
        summary: "Get all cached transit routes",
        tags: ["Transit"],
        description: "Returns routes synced from the Winnipeg Transit API with badge colors",
        responses: { 200: { description: "List of transit routes" } },
      },
    },
    "/api/transit/routes/{routeKey}": {
      get: {
        summary: "Get a transit route by key",
        tags: ["Transit"],
        parameters: [{ in: "path", name: "routeKey", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "Route found" }, 404: { description: "Not found" } },
      },
    },
    "/api/transit/routes/{routeKey}/stops": {
      get: {
        summary: "Get all stops along a route",
        tags: ["Transit"],
        description: "Live call to the Winnipeg Transit API",
        parameters: [{ in: "path", name: "routeKey", required: true, schema: { type: "string" } }],
        responses: { 200: { description: "Stops on the route" }, 502: { description: "Transit API unavailable" } },
      },
    },
    "/api/transit/trip-planner": {
      get: {
        summary: "Plan a trip between two locations",
        tags: ["Transit"],
        description: "Uses the Winnipeg Transit trip planner. Locations as geo/lat,lng",
        parameters: [
          { in: "query", name: "origin", required: true, schema: { type: "string" }, example: "geo/49.8951,-97.1384" },
          { in: "query", name: "destination", required: true, schema: { type: "string" }, example: "geo/49.8094,-97.1327" },
        ],
        responses: { 200: { description: "Trip plan with segments" }, 502: { description: "Transit API unavailable" } },
      },
    },
    "/api/transit/advisories": {
      get: {
        summary: "Get current service advisories",
        tags: ["Transit"],
        description: "Live service alerts from Winnipeg Transit",
        responses: { 200: { description: "Current advisories" } },
      },
    },
    "/api/transit/sync": {
      get: {
        summary: "Sync transit data from the API",
        tags: ["Transit"],
        description: "Pulls routes and stops from the Winnipeg Transit API into the database. Safe to call multiple times.",
        responses: { 200: { description: "Sync complete with counts" } },
      },
    },
  },
}

export default swaggerSpec
