import express from "express";
import {
  getPerfumes,
  getPerfumeById,
  getPaginatedPerfumes,
  getAllBrands,
  getPerfumesByBrand,
  getSimilarityOptions,
} from "../controllers/allPerfumeController.js";

const router = express.Router();

router.route("/").get(getPerfumes);
router.route("/brands").get(getAllBrands);
router.route("/similarity-options").get(getSimilarityOptions);
router.route("/brand/:brandName").get(getPerfumesByBrand);
router.route("/page/:pageNumber").get(getPaginatedPerfumes);
router.route("/:id").get(getPerfumeById);

export default router;
