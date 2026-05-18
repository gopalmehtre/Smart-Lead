import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Lead } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getStatusColor, getSourceColor, formatDate } from "@/utils";

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  isAdmin: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onView: (lead: Lead) => void;
}

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </td>
    ))}
  </tr>
);

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  isLoading,
  isAdmin,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {["Name", "Email", "Status", "Source", "Created At", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {isLoading ? (
            [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
          ) : leads.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-12 text-center text-gray-400 dark:text-gray-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <p className="font-medium">No leads found</p>
                  <p className="text-xs">Try adjusting your filters</p>
                </div>
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr
                key={lead._id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {lead.email}
                </td>
                <td className="px-4 py-3">
                  <Badge className={getStatusColor(lead.status)}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge className={getSourceColor(lead.source)}>
                    {lead.source}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(lead)}
                    >
                      View
                    </Button>
                    {isAdmin && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(lead)}
                          leftIcon={<Edit2 className="h-3.5 w-3.5" />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(lead)}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          leftIcon={<Trash2 className="h-3.5 w-3.5" />}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
