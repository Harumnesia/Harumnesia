import express from "express";
import axios from "axios";

const router = express.Router();

const AI_SERVICE_URL = "http://localhost:5002";

// Get similarity-based recommendations
router.post("/similarity", async (req, res) => {
  try {
    const {
      perfume,
      brand,
      num_recommendations = 5,
      only_local = true,
    } = req.body;

    if (!perfume) {
      return res.status(400).json({
        success: false,
        message: "Perfume name is required",
      });
    }

    const response = await axios.post(`${AI_SERVICE_URL}/recommend`, {
      perfume,
      num_recommendations,
      only_local,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("AI Service error:", error.response?.data || error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: error.response.data.error || "Perfume not found",
        available_perfumes: error.response.data.available_perfumes || [],
      });
    }

    res.status(500).json({
      success: false,
      message: error.response?.data?.error || "Failed to get recommendations",
    });
  }
});

// Calculate similarity between two perfumes
router.post("/similarity/compare", async (req, res) => {
  try {
    const { perfume1, perfume2 } = req.body;

    if (!perfume1 || !perfume2) {
      return res.status(400).json({
        success: false,
        message: "Both perfume names are required",
      });
    }

    const response = await axios.post(`${AI_SERVICE_URL}/similarity`, {
      perfume1,
      perfume2,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Similarity calculation error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: error.response?.data?.error || "Failed to calculate similarity",
    });
  }
});

// Search perfumes using AI service
router.get("/search", async (req, res) => {
  try {
    const { q, brand, only_local = "true", limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await axios.get(`${AI_SERVICE_URL}/search`, {
      params: { q, brand, only_local, limit },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Search service error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: error.response?.data?.error || "Failed to search perfumes",
    });
  }
});

// Get all available brands from AI service
router.get("/brands", async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/brands`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Brands service error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to get brands",
    });
  }
});

// Get all perfumes from AI service
router.get("/perfumes", async (req, res) => {
  try {
    const { brand } = req.query;

    const response = await axios.get(`${AI_SERVICE_URL}/perfumes`, {
      params: { brand },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Perfumes service error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to get perfumes",
    });
  }
});

// Health check for AI service
router.get("/health", async (req, res) => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/health`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI service is not available",
    });
  }
});

export default router;
