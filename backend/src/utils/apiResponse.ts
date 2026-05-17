import { Response } from "express";
import { ApiResponse, PaginatedResponse } from "../types";

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200
): Response => {
  const response: ApiResponse<T> = { success: true, message, data };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400
): Response => {
  const response: ApiResponse = { success: false, message };
  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  page: number,
  totalPages: number,
  total: number,
  limit: number
): Response => {
  const response: PaginatedResponse<T> = {
    success: true,
    data,
    page,
    totalPages,
    total,
    limit,
  };
  return res.status(200).json(response);
};