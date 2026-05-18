import React, { useEffect, useState } from "react";
import { Users, TrendingUp, UserCheck, UserX } from "lucide-react";
import { leadService } from "@/services/lead.service";
import { Lead, LeadStatus } from "@/types";
import { useAuthStore } from "@/store/authStore";

interface StatCard {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Fetch all with a large limit to compute stats
        const result = await leadService.getAll({ page: 1 });
        setLeads(result.data);
      } catch {
        // silently fail on dashboard
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats: StatCard[] = [
    {
      label: "Total Leads",
      value: leads.length,
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Qualified",
      value: leads.filter((l) => l.status === LeadStatus.QUALIFIED).length,
      icon: <UserCheck className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Contacted",
      value: leads.filter((l) => l.status === LeadStatus.CONTACTED).length,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      label: "Lost",
      value: leads.filter((l) => l.status === LeadStatus.LOST).length,
      icon: <UserX className="h-5 w-5" />,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(" ")[0]} !
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening with your leads today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4"
          >
            <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
              {isLoading ? (
                <div className="h-6 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
              ) : (
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent leads preview */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Recent Leads
        </h2>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
            No leads yet. Go to Leads to add your first one!
          </p>
        ) : (
          <div className="space-y-2">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead._id}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {lead.name}
                  </p>
                  <p className="text-xs text-gray-400">{lead.email}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium">
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
