import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LeadFilters as ILeadFilters, LeadStatus, LeadSource, SortOrder } from "@/types";

interface LeadFiltersProps {
  filters: ILeadFilters;
  onFilterChange: <K extends keyof ILeadFilters>(key: K, value: ILeadFilters[K]) => void;
  onReset: () => void;
}

const statusOptions = [
  ...Object.values(LeadStatus).map((s) => ({ value: s, label: s })),
];

const sourceOptions = [
  ...Object.values(LeadSource).map((s) => ({ value: s, label: s })),
];

const sortOptions = [
  { value: SortOrder.LATEST, label: "Latest First" },
  { value: SortOrder.OLDEST, label: "Oldest First" },
];

export const LeadFiltersBar: React.FC<LeadFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters =
    filters.status || filters.source || filters.search || filters.sort !== SortOrder.LATEST;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
        />
      </div>

      <div className="w-40">
        <Select
          placeholder="All Statuses"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
          options={statusOptions}
        />
      </div>

      <div className="w-40">
        <Select
          placeholder="All Sources"
          value={filters.source}
          onChange={(e) => onFilterChange("source", e.target.value)}
          options={sourceOptions}
        />
      </div>

      <div className="w-40">
        <Select
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value as SortOrder)}
          options={sortOptions}
        />
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          leftIcon={<X className="h-4 w-4" />}
        >
          Clear
        </Button>
      )}
    </div>
  );
};
