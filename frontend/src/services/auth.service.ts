import api from "./api";
import { ApiResponse, AuthResponse, LoginFormData, RegisterFormData } from "@/types";

export const authService = {
  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/register", data);
    return res.data.data!;
  },

  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const res = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
    return res.data.data!;
  },
};
