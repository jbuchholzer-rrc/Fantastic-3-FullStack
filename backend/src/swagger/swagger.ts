/**
 * @author Jack Buchholzer
 * Swagger config for the API documentation
 *
 * generates the OpenAPI spec from JSDoc comments in the route files
 * the docs are served at /api/docs
 */

import swaggerJsdoc from "swagger-jsdoc"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Winnipeg Transit Tracker API",
      version: "1.0.0",
      description: "Backend API for the Winnipeg Transit Tracker app. Includes CRUD endpoints for buses, trips, and stops, plus a proxy to the Winnipeg Transit Open Data API for live schedules, route data, and trip planning.",
    },
    servers: [
      {
        url: "/",
        description: "Current server",
      },
    ],
  },
  apis: ["./backend/src/routes/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
