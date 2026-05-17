import Lead from "../models/Lead";
import {
  ILead,
  LeadQueryParams,
  LeadStatus,
  LeadSource,
  SortOrder,
} from "../types";
import { FilterQuery } from "mongoose";

const LIMIT = 10;

export const getLeads = async (
  params: LeadQueryParams
): Promise<{
  data: ILead[];
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}> => {
  const { status, source, search, sort = SortOrder.LATEST, page = "1" } = params;

  const query: FilterQuery<ILead> = {};

  if (status) query.status = status;
  if (source) query.source = source;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(1, Number(page));
  const skip = (pageNum - 1) * LIMIT;
  const sortOrder = sort === SortOrder.OLDEST ? 1 : -1;

  const [data, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(LIMIT),
    Lead.countDocuments(query),
  ]);

  return {
    data,
    page: pageNum,
    totalPages: Math.ceil(total / LIMIT),
    total,
    limit: LIMIT,
  };
};

export const getLeadById = async (id: string): Promise<ILead> => {
  const lead = await Lead.findById(id);
  if (!lead) {
    throw Object.assign(new Error("Lead not found"), { statusCode: 404 });
  }
  return lead;
};

export const createLead = async (
  body: Partial<ILead>
): Promise<ILead> => {
  const lead = await Lead.create(body);
  return lead;
};

export const updateLead = async (
  id: string,
  body: Partial<ILead>
): Promise<ILead> => {
  const lead = await Lead.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true, runValidators: true }
  );
  if (!lead) {
    throw Object.assign(new Error("Lead not found"), { statusCode: 404 });
  }
  return lead;
};

export const deleteLead = async (id: string): Promise<void> => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) {
    throw Object.assign(new Error("Lead not found"), { statusCode: 404 });
  }
};

export const exportLeadsAsCsv = async (
  params: Omit<LeadQueryParams, "page">
): Promise<ILead[]> => {
  const { status, source, search, sort = SortOrder.LATEST } = params;
  const query: FilterQuery<ILead> = {};

  if (status) query.status = status;
  if (source) query.source = source;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = sort === SortOrder.OLDEST ? 1 : -1;
  return Lead.find(query).sort({ createdAt: sortOrder });
};
