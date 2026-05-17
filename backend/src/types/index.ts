import { Request } from "express";
import { Types } from "mongoose";

//Enums

export enum UserRole {
  ADMIN = "admin",
  SALES = "sales",
}

export enum LeadStatus {
  NEW = "New",
  CONTACTED = "Contacted",
  QUALIFIED = "Qualified",
  LOST = "Lost",
}

export enum LeadSource {
  WEBSITE = "Website",
  INSTAGRAM = "Instagram",
  REFERRAL = "Referral",
}

export enum SortOrder {
  LATEST = "latest",
  OLDEST = "oldest",
}

//User Type

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserPayload {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

// Lead Type

export interface ILead {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadQueryParams {
  status?: LeadStatus;
  source?: LeadSource;
  search?: string;
  sort?: SortOrder;
  page?: string;
}

//API Response Types

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}

// Auth Types

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

// Extended Request

export interface AuthRequest extends Request {
  user?: IUserPayload;
}