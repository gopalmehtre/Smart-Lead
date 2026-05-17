import { Router } from "express";
import {
  getAllLeads,
  getOneLead,
  addLead,
  editLead,
  removeLead,
  exportCsv,
} from "../controllers/lead.controller";
import { authenticate, authorize } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { createLeadSchema, updateLeadSchema } from "../utils/validators";
import { UserRole } from "../types";

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get("/", getAllLeads);
router.get("/export/csv", authorize(UserRole.ADMIN), exportCsv);
router.get("/:id", getOneLead);
router.post("/", authorize(UserRole.ADMIN), validate(createLeadSchema), addLead);
router.put("/:id", authorize(UserRole.ADMIN), validate(updateLeadSchema), editLead);
router.delete("/:id", authorize(UserRole.ADMIN), removeLead);

export default router;
