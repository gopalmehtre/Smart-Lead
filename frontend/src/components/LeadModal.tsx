import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { leadSchema, LeadFormValues } from "@/utils/validators";
import { Lead, LeadStatus, LeadSource } from "@/types";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadFormValues) => Promise<void>;
  lead?: Lead | null;
  isSubmitting: boolean;
}

const statusOptions = Object.values(LeadStatus).map((s) => ({ value: s, label: s }));
const sourceOptions = Object.values(LeadSource).map((s) => ({ value: s, label: s }));

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lead,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      status: LeadStatus.NEW,
      source: LeadSource.WEBSITE,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name,
        email: lead.email,
        status: lead.status,
        source: lead.source,
      });
    } else {
      reset({
        name: "",
        email: "",
        status: LeadStatus.NEW,
        source: LeadSource.WEBSITE,
      });
    }
  }, [lead, reset, isOpen]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={lead ? "Edit Lead" : "Add New Lead"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Rahul Sharma"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. rahul@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Status"
            options={statusOptions}
            error={errors.status?.message}
            {...register("status")}
          />
          <Select
            label="Source"
            options={sourceOptions}
            error={errors.source?.message}
            {...register("source")}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="flex-1"
          >
            {lead ? "Update Lead" : "Create Lead"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
