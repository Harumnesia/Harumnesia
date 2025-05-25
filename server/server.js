import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import brandRoutes from "./routes/brandRoutes.js";
import allPerfumeRoutes from "./routes/allPerfumeRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/perfumes", allPerfumeRoutes);
app.use("/api/brands", brandRoutes);

// Set up for image uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
