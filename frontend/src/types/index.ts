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

//User

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Leads

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface LeadFilters {
  status: string;
  source: string;
  search: string;
  sort: SortOrder;
  page: number;
}

//API

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

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginFormData {
  email: string;
  password: string;
}
