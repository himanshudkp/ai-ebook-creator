import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["interviewer", "candidate"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type WSMessageType =
  | "code_update"
  | "cursor_position"
  | "whiteboard_update"
  | "user_joined"
  | "user_left";

export interface WSMessage {
  type: WSMessageType;
  payload: unknown;
  userId: string;
  timestamp: number;
}
