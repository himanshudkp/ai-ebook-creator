import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  aws: {
    region: process.env.AWS_REGION || "us-east-1",
    s3Bucket: process.env.AWS_S3_BUCKET || "",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  frontend: {
    url: process.env.FRONTEND_URL || "http://localhost:5173",
  },
};
