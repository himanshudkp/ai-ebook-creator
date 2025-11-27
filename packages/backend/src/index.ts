import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { connectDatabase } from "./config/database";
import { logger } from "./config/logger";
import { authRoutes } from "./routes";
import { errorHandler } from "./middleware";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/api",
  rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"),
    message: "Too many requests from this IP, please try again later.",
  })
);

app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(`/api/${process.env.API_VERSION}/auth`, authRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    logger.info("Database connected successfully");

    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
