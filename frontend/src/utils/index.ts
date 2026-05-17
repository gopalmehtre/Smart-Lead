import { LeadStatus, LeadSource } from "@/types";

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getStatusColor = (status: LeadStatus): string => {
  const colors: Record<LeadStatus, string> = {
    [LeadStatus.NEW]: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    [LeadStatus.CONTACTED]: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    [LeadStatus.QUALIFIED]: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    [LeadStatus.LOST]: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

export const getSourceColor = (source: LeadSource): string => {
  const colors: Record<LeadSource, string> = {
    [LeadSource.WEBSITE]: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    [LeadSource.INSTAGRAM]: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    [LeadSource.REFERRAL]: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  };
  return colors[source] || "bg-gray-100 text-gray-700";
};

export const downloadCsv = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
