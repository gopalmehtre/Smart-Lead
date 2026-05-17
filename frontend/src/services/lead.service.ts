import api from "./api";
import {
  Lead,
  LeadFormData,
  LeadFilters,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export const leadService = {
  getAll: async (filters: Partial<LeadFilters>): Promise<PaginatedResponse<Lead>> => {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.source) params.append("source", filters.source);
    if (filters.search) params.append("search", filters.search);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.page) params.append("page", String(filters.page));

    const res = await api.get<PaginatedResponse<Lead>>(`/leads?${params.toString()}`);
    return res.data;
  },

  getById: async (id: string): Promise<Lead> => {
    const res = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return res.data.data!;
  },

  create: async (data: LeadFormData): Promise<Lead> => {
    const res = await api.post<ApiResponse<Lead>>("/leads", data);
    return res.data.data!;
  },

  update: async (id: string, data: Partial<LeadFormData>): Promise<Lead> => {
    const res = await api.put<ApiResponse<Lead>>(`/leads/${id}`, data);
    return res.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  exportCsv: async (filters: Partial<LeadFilters>): Promise<Blob> => {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.source) params.append("source", filters.source);
    if (filters.search) params.append("search", filters.search);
    if (filters.sort) params.append("sort", filters.sort);

    const res = await api.get(`/leads/export/csv?${params.toString()}`, {
      responseType: "blob",
    });
    return res.data;
  },
};
