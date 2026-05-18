import React, { useState } from "react";
import { Plus, Download } from "lucide-react";
import { LeadTable } from "@/components/LeadTable";
import { LeadFiltersBar } from "@/components/LeadFilters";
import { Pagination } from "@/components/Pagination";
import { LeadModal } from "@/components/LeadModal";
import { ViewLeadModal } from "@/components/ViewLeadModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { Button } from "@/components/ui/Button";
import { useLeads } from "@/hooks/useLeads";
import { useAuthStore } from "@/store/authStore";
import { leadService } from "@/services/lead.service";
import { Lead, LeadFormData } from "@/types";
import { LeadFormValues } from "@/utils/validators";
import { downloadCsv } from "@/utils";

export const Leads: React.FC = () => {
  const { isAdmin } = useAuthStore();
  const {
    leads,
    pagination,
    filters,
    isLoading,
    error,
    updateFilter,
    resetFilters,
    refetch,
  } = useLeads();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewLeadId, setViewLeadId] = useState<string | null>(null);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleCreate = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      await leadService.create(data as LeadFormData);
      setAddModalOpen(false);
      refetch();
    } catch (err: unknown) {
      console.error("Failed to create lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: LeadFormValues) => {
    if (!editLead) return;
    setIsSubmitting(true);
    try {
      await leadService.update(editLead._id, data as LeadFormData);
      setEditLead(null);
      refetch();
    } catch (err: unknown) {
      console.error("Failed to update lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteLead) return;
    setIsDeleting(true);
    try {
      await leadService.delete(deleteLead._id);
      setDeleteLead(null);
      refetch();
    } catch (err: unknown) {
      console.error("Failed to delete lead:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await leadService.exportCsv(filters);
      downloadCsv(blob, `leads-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (err: unknown) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {pagination.total} total leads
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin() && (
            <>
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Download className="h-4 w-4" />}
                onClick={handleExport}
                isLoading={isExporting}
              >
                Export CSV
              </Button>
              <Button
                size="sm"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={() => setAddModalOpen(true)}
              >
                Add Lead
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <LeadFiltersBar
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {/* Error state */}
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      <LeadTable
        leads={leads}
        isLoading={isLoading}
        isAdmin={isAdmin()}
        onEdit={setEditLead}
        onDelete={setDeleteLead}
        onView={(lead) => setViewLeadId(lead._id)}
      />

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={(p) => updateFilter("page", p)}
        />
      )}

      {/* Modals */}
      <LeadModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />

      <LeadModal
        isOpen={!!editLead}
        onClose={() => setEditLead(null)}
        onSubmit={handleUpdate}
        lead={editLead}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={!!deleteLead}
        lead={deleteLead}
        onClose={() => setDeleteLead(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <ViewLeadModal
        isOpen={!!viewLeadId}
        onClose={() => setViewLeadId(null)}
        leadId={viewLeadId}
      />
    </div>
  );
};
