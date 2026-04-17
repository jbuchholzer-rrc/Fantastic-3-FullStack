import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import busRoutes from "./routes/busRoutes";
import tripRoutes from "./routes/tripRoutes";
import stopRoutes from "./routes/stopRoutes";
import transitRoutes from "./routes/transitRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// clerk parses the auth token on every request
// doesnt block anything, just makes auth info available via getAuth(req)
app.use(clerkMiddleware());

// swagger API docs - use CDN so the assets load on vercel
const swaggerOptions = {
  customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css",
  customJs: [
    "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js",
    "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js",
  ],
}
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/buses", busRoutes);
app.use("/api/trips", tripRoutes);
app.use("/stops", stopRoutes);
app.use("/api/transit", transitRoutes);

export default app;