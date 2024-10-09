import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ussdRoutes from "./routes/ussdRoute.js";
import { connectDB } from "./config/database.js";
import { seedDatabase } from "./config/seedData.js";

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000" || process.env.FRONTEND_URL,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and seed the database
(async () => {
  await connectDB();
  await seedDatabase();
})();

// Routes
app.use("/ussd", ussdRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 2500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
