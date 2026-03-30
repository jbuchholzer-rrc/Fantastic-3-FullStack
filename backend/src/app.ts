import express from "express";
import cors from "cors";
import busRoutes from "./routes/busRoutes";
import tripRoutes from "./routes/tripRoutes";
import stopRoutes from "./routes/stopRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/buses", busRoutes);
app.use("/api/trips", tripRoutes);
app.use("/stops", stopRoutes);

export default app;
