import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";
import { AppError } from "../utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: err.message,
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
    return;
  }

  res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};
