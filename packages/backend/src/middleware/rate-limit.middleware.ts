import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";

export const rateLimiter = (maxRequests: number, windowSeconds: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `rl:${req.ip}:${req.path}`;
      const current = await redis.incr(key);

      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }

      if (current > maxRequests) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
        });
      }

      next();
    } catch (error) {
      next();
    }
  };
};
