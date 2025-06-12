import express from "express";
import {
  getPerfumes,
  getPerfumeById,
  getPaginatedPerfumes,
  getAllBrands,
  getPerfumesByBrand,
  getPerfumeRecommendations,
  getPerfumeBrands,
} from "../controllers/allPerfumeController.js";

const router = express.Router();

router.route("/").get(getPerfumes);
router.route("/brands").get(getPerfumeBrands); // Get brand names only
router.route("/brand/:brandName").get(getPerfumesByBrand);
router.route("/page/:pageNumber").get(getPaginatedPerfumes);
router.route("/recommend").post(getPerfumeRecommendations);
router.route("/:id").get(getPerfumeById);

export default router;
