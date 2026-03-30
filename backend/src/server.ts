import express from "express";
import cors from "cors";
import stopRoutes from "./routes/stopRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/stops", stopRoutes);

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Stops API: http://localhost:${PORT}/stops`);
});