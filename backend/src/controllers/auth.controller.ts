import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { sendSuccess } from "../utils/apiResponse";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await registerUser(req.body);
    sendSuccess(res, "Registration successful", result, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await loginUser(req.body);
    sendSuccess(res, "Login successful", result);
  } catch (error) {
    next(error);
  }
};
