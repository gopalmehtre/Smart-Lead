import { Response, NextFunction } from "express";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsAsCsv,
} from "../services/lead.service";
import { sendSuccess, sendError, sendPaginated } from "../utils/apiResponse";
import { AuthRequest, LeadQueryParams } from "../types";

export const getAllLeads = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const params = req.query as unknown as LeadQueryParams;
    const result = await getLeads(params);
    sendPaginated(
      res,
      result.data,
      result.page,
      result.totalPages,
      result.total,
      result.limit
    );
  } catch (error) {
    next(error);
  }
};

export const getOneLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await getLeadById(req.params.id);
    sendSuccess(res, "Lead fetched successfully", lead);
  } catch (error) {
    next(error);
  }
};

export const addLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await createLead(req.body);
    sendSuccess(res, "Lead created successfully", lead, 201);
  } catch (error) {
    next(error);
  }
};

export const editLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await updateLead(req.params.id, req.body);
    sendSuccess(res, "Lead updated successfully", lead);
  } catch (error) {
    next(error);
  }
};

export const removeLead = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await deleteLead(req.params.id);
    sendSuccess(res, "Lead deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const exportCsv = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, source, search, sort } = req.query as LeadQueryParams;
    const leads = await exportLeadsAsCsv({ status, source, search, sort });

    const headers = ["Name", "Email", "Status", "Source", "Created At"];
    const rows = leads.map((lead) => [
      `"${lead.name}"`,
      `"${lead.email}"`,
      `"${lead.status}"`,
      `"${lead.source}"`,
      `"${new Date(lead.createdAt).toLocaleDateString()}"`,
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="leads-${Date.now()}.csv"`
    );
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};
