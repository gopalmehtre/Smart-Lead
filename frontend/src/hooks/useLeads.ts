import { useState, useEffect, useCallback } from "react";
import { leadService } from "@/services/lead.service";
import { Lead, LeadFilters, PaginatedResponse, SortOrder } from "@/types";
import { useDebounce } from "./useDebounce";

const DEFAULT_FILTERS: LeadFilters = {
  status: "",
  source: "",
  search: "",
  sort: SortOrder.LATEST,
  page: 1,
};

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });
  const [filters, setFilters] = useState<LeadFilters>(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result: PaginatedResponse<Lead> = await leadService.getAll({
        ...filters,
        search: debouncedSearch,
      });
      setLeads(result.data);
      setPagination({
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: result.limit,
      });
    } catch {
      setError("Failed to fetch leads. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateFilter = <K extends keyof LeadFilters>(
    key: K,
    value: LeadFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // reset to page 1 when filters change (not page itself)
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return {
    leads,
    pagination,
    filters,
    isLoading,
    error,
    updateFilter,
    resetFilters,
    refetch: fetchLeads,
  };
}
