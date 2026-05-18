import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Lead } from "@/types";
import { getStatusColor, getSourceColor, formatDate } from "@/utils";
import { leadService } from "@/services/lead.service";

interface ViewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string | null;
}

export const ViewLeadModal: React.FC<ViewLeadModalProps> = ({
  isOpen,
  onClose,
  leadId,
}) => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && leadId) {
      const fetchLead = async () => {
        setIsLoading(true);
        setError("");
        try {
          const data = await leadService.getById(leadId);
          setLead(data);
        } catch (err) {
          setError("Failed to load lead details.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchLead();
    } else {
      setLead(null);
    }
  }, [isOpen, leadId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Details">
      <div className="space-y-4">
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : lead ? (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium text-gray-900 dark:text-white">{lead.name}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{lead.email}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Source</p>
                <Badge className={getSourceColor(lead.source)}>{lead.source}</Badge>
              </div>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Created At</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(lead.createdAt)}
              </p>
            </div>
          </div>
        ) : null}

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
