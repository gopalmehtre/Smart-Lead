import { z } from "zod";
import { UserRole, LeadStatus, LeadSource } from "../types";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.nativeEnum(UserRole).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Invalid email address"),
  status: z.nativeEnum(LeadStatus).optional(),
  source: z.nativeEnum(LeadSource, {
    errorMap: () => ({ message: "Source must be Website, Instagram, or Referral" }),
  }),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email("Invalid email address").optional(),
  status: z.nativeEnum(LeadStatus).optional(),
  source: z.nativeEnum(LeadSource).optional(),
});