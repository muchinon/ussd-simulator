import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import ussdRoutes from "./routes/ussdRoute.js";
import { connectDB } from "./config/database.js";
import { seedDatabase } from "./config/seedData.js";
import { restartServer } from "./restartServer.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 2500;

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});

// Routes
app.use("/ussd", ussdRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL);
};

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      reboot().then(() => {
        console.log(`Server Restarted`);
      });
      console.log(`Server is connected to Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });

// seed the database
(async () => {
  await seedDatabase();
})();

export default app;
