import express from "express";
import {
  getAllInterPerfumes,
  getInterBrands,
  getPerfumesByBrand,
  searchPerfumes,
  getDropdownData,
} from "../controllers/interPerfumeController.js";

const router = express.Router();

// Get all international perfumes
router.get("/perfumes", getAllInterPerfumes);

// Get all international brands
router.get("/brands", getInterBrands);

// Get perfumes by specific brand
router.get("/brands/:brand/perfumes", getPerfumesByBrand);

// Search perfumes (by name or brand)
router.get("/search", searchPerfumes);

// Get dropdown data (formatted for UI components)
router.get("/dropdown", getDropdownData);

export default router;
