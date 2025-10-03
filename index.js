import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./backend/config/db.js";
import authRoutes from "./backend/routes/auth.js"; // <-- chemin corrigé

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);

// Connexion à MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
