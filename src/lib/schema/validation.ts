import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().max(255, "The title cannot exceed 255 characters"),
  description: z
    .string()
    .max(1000, "The description cannot exceed 1000 characters")
    .optional(),
  duedate: z.string().datetime().optional(),
  priority: z.enum(["low", "medium", "high"]),
  completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().max(255).optional(),
  description: z.string().max(1000).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  completed: z.boolean().optional(),
});
