import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import busRoutes from "./routes/busRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/buses", busRoutes);

export default app;