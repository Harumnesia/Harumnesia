import AllPerfume from "../models/AllPerfume.js";

// Configuration for ML recommendation service
const ML_SERVICE_URL =
  process.env.ML_SERVICE_URL || "https://api.harumnesia.web.id";
const ML_RECOMMEND_ENDPOINT = `${ML_SERVICE_URL}/recommend`;

// @desc    Fetch all perfumes from the large collection
// @route   GET /api/perfumes
// @access  Public
const getPerfumes = async (req, res) => {
  try {
    const perfumes = await AllPerfume.find({});
    console.log(`Total perfumes in database: ${perfumes.length}`);

    // Transform data to ensure each perfume has a name
    const validPerfumes = perfumes.map((perfume) => {
      const p = perfume.toObject();

      // Use perfume field if name is missing
      if (!p.name && p.perfume) {
        p.name = p.perfume;
      }

      // Set a fallback name if still no name
      if (!p.name) {
        p.name = `Perfume ${p.perfumeId || p["ID Perfume"] || p._id}`;
      }

      return p;
    });

    res.json(validPerfumes);
  } catch (error) {
    console.error("Error fetching all perfumes:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single perfume
// @route   GET /api/perfumes/:id
// @access  Public
const getPerfumeById = async (req, res) => {
  try {
    // Try to find perfume using different possible field names for the ID
    const perfumeId = req.params.id;
    console.log(`Looking for perfume with ID: ${perfumeId}`);

    // Use $or to check multiple fields
    const perfume = await AllPerfume.findOne({
      $or: [{ perfumeId: perfumeId }, { "ID Perfume": perfumeId }],
    });

    if (perfume) {
      // Convert to plain object for manipulation
      const perfumeData = perfume.toObject();

      // Add name if missing (using perfume field or fallback)
      if (!perfumeData.name && perfumeData.perfume) {
        console.log(`Using 'perfume' field as name for ${perfumeId}`);
        perfumeData.name = perfumeData.perfume;
      } else if (!perfumeData.name) {
        console.log(`Setting fallback name for ${perfumeId}`);
        perfumeData.name = `Perfume ${perfumeId}`;
      }

      console.log(`Found perfume: ${perfumeData.name} (${perfumeData.brand})`);
      res.json(perfumeData);
    } else {
      console.log(`No perfume found with ID: ${perfumeId}`);
      res.status(404).json({ message: "Perfume not found" });
    }
  } catch (error) {
    console.error("Error fetching perfume:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch all unique brands from parfumdb collection
// @route   GET /api/perfumes/brands
// @access  Public
const getAllBrands = async (req, res) => {
  try {
    // Menggunakan distinct untuk mendapatkan semua nilai brand yang unik
    const brands = await AllPerfume.distinct("brand");
    // Mengurutkan brand secara alfabetis
    brands.sort();

    console.log(`Total unique brands: ${brands.length}`);
    res.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch perfumes by brand
// @route   GET /api/perfumes/brand/:brandName
// @access  Public
const getPerfumesByBrand = async (req, res) => {
  try {
    const brandName = req.params.brandName;
    console.log(`Looking for perfumes with brand: ${brandName}`);

    // First try exact match
    let perfumes = await AllPerfume.find({ brand: brandName }).sort({
      name: 1,
    });

    // If no results, try case-insensitive match using regex
    if (perfumes.length === 0) {
      console.log(
        `No exact match for brand "${brandName}", trying case-insensitive search`
      );

      // Create a case-insensitive regex
      const brandRegex = new RegExp(`^${brandName}$`, "i");

      perfumes = await AllPerfume.find({ brand: brandRegex }).sort({
        name: 1,
      });

      if (perfumes.length > 0) {
        console.log(
          `Found ${perfumes.length} perfumes with case-insensitive match for brand: ${brandName}`
        );
        // Get the actual brand name with correct case from the first result
        const actualBrandName = perfumes[0].brand;
        console.log(
          `Actual brand name with correct case: "${actualBrandName}"`
        );
      }
    }

    if (perfumes.length > 0) {
      console.log(`Found ${perfumes.length} perfumes for brand: ${brandName}`);
      // Sample first perfume for debugging
      console.log(
        "First perfume data:",
        JSON.stringify(perfumes[0], null, 2).substring(0, 200) + "..."
      );

      // Transform data to ensure each perfume has a name
      const validPerfumes = perfumes.map((perfume) => {
        const p = perfume.toObject();

        // Use perfume field if name is missing
        if (!p.name && p.perfume) {
          console.log(`Using 'perfume' field as name for ${p._id}`);
          p.name = p.perfume;
        }

        // Set a fallback name if still no name
        if (!p.name) {
          const id = p.perfumeId || p["ID Perfume"] || p._id;
          console.log(`Setting fallback name for perfume ${id}`);
          p.name = `Perfume ${id}`;
        }

        // Ensure brand is present
        if (!p.brand) {
          p.brand = brandName;
        }

        return p;
      });

      res.json(validPerfumes);
    } else {
      console.log(`No perfumes found for brand: ${brandName}`);
      res
        .status(404)
        .json({ message: `No perfumes found for brand: ${brandName}` });
    }
  } catch (error) {
    console.error("Error fetching perfumes by brand:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch perfumes with pagination
// @route   GET /api/perfumes/page/:pageNumber
// @access  Public
const getPaginatedPerfumes = async (req, res) => {
  try {
    const pageSize = 12; // Number of items per page
    const page = Number(req.params.pageNumber) || 1;

    const count = await AllPerfume.countDocuments();
    const perfumes = await AllPerfume.find({})
      .sort({ name: 1 }) // Sort by name for consistency
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Transform data to ensure each perfume has a name
    const validPerfumes = perfumes.map((perfume) => {
      const p = perfume.toObject();

      // Use perfume field if name is missing (this seems to be the case in the database)
      if (!p.name && p.perfume) {
        p.name = p.perfume;
      }

      // Set a fallback name if still no name
      if (!p.name) {
        p.name = `Perfume ${p.perfumeId || p["ID Perfume"] || p._id}`;
      }

      // Debug data structure
      if (!p.name) {
        console.warn(
          `Still missing name for perfume: ${JSON.stringify(
            p,
            null,
            2
          ).substring(0, 200)}...`
        );
      }

      return p;
    });

    res.json({
      perfumes: validPerfumes,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    console.error("Error fetching paginated perfumes:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get perfume recommendations based on similarity
// @route   POST /api/perfumes/recommend
// @access  Public
const getPerfumeRecommendations = async (req, res) => {
  try {
    const { perfume } = req.body;

    if (!perfume) {
      return res.status(400).json({ message: "Perfume name is required" });
    }

    console.log(`Getting recommendations for perfume: "${perfume}"`);
    console.log(`ML Service configured at: ${ML_SERVICE_URL}`);

    try {
      // Call external ML recommendation service at api.harumnesia.web.id
      console.log(
        `Calling ML service at ${ML_RECOMMEND_ENDPOINT} with payload:`,
        { perfume }
      );

      const response = await fetch(ML_RECOMMEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ perfume }),
        // Note: fetch doesn't support timeout option directly in Node.js
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(
          `Recommendation service error: ${response.status} - ${response.statusText}`
        );
      }

      const recommendationData = await response.json();
      console.log(
        "✅ ML service response received:",
        JSON.stringify(recommendationData, null, 2)
      );

      // Handle different response formats from the ML service
      let recommendedIds = [];

      if (
        recommendationData.recommendations &&
        Array.isArray(recommendationData.recommendations)
      ) {
        recommendedIds = recommendationData.recommendations
          .map((rec) => {
            // Handle different ID field names
            return rec.id || rec.perfumeId || rec["ID Perfume"] || rec._id;
          })
          .filter(Boolean);
      } else if (
        recommendationData.ids &&
        Array.isArray(recommendationData.ids)
      ) {
        recommendedIds = recommendationData.ids;
      } else if (Array.isArray(recommendationData)) {
        recommendedIds = recommendationData;
      }

      if (recommendedIds.length === 0) {
        console.log("No recommendation IDs found in response");
        return res.json({
          message: "No recommendations found for this perfume",
          recommendations: [],
          success: true,
        });
      }

      console.log(
        `Found ${recommendedIds.length} recommended IDs:`,
        recommendedIds
      );

      // Fetch full perfume data for the recommended IDs
      const perfumes = await AllPerfume.find({
        $or: [
          { perfumeId: { $in: recommendedIds } },
          { "ID Perfume": { $in: recommendedIds } },
          {
            _id: {
              $in: recommendedIds.filter((id) => /^[0-9a-fA-F]{24}$/.test(id)),
            },
          }, // Valid ObjectId format
        ],
      });

      // Transform data to ensure each perfume has proper fields
      const validPerfumes = perfumes.map((perfume) => {
        const p = perfume.toObject();

        // Ensure name field exists
        if (!p.name && p.perfume) {
          p.name = p.perfume;
        }
        if (!p.name) {
          p.name = `Perfume ${p.perfumeId || p["ID Perfume"] || p._id}`;
        }

        // Ensure other fields have defaults
        p.brand = p.brand || "Local Brand";
        p.price = p.price || "Rp 189.000";
        p.volume = p.volume || "30ml";
        p.concentration = p.concentration || "EDT";
        p.description = p.description || p.notes || "Aroma yang memikat";

        return p;
      });

      // Sort perfumes to match the recommendation order if possible
      const sortedPerfumes = [];
      recommendedIds.forEach((id) => {
        const found = validPerfumes.find(
          (p) =>
            p.perfumeId === id ||
            p["ID Perfume"] === id ||
            p._id.toString() === id
        );
        if (found) {
          sortedPerfumes.push(found);
        }
      });

      console.log(
        `Successfully found ${sortedPerfumes.length} perfumes for ${recommendedIds.length} recommended IDs`
      );

      res.json({
        recommendations: sortedPerfumes,
        success: true,
        originalResponse: recommendationData,
        message:
          sortedPerfumes.length > 0
            ? `Found ${sortedPerfumes.length} similar perfumes`
            : "No matching perfumes found in database",
      });
    } catch (apiError) {
      console.error(
        "❌ Error calling ML recommendation service:",
        apiError.message
      );

      // Determine if this is a connection error or service unavailability
      const isConnectionError =
        apiError.code === "ECONNREFUSED" ||
        apiError.code === "ENOTFOUND" ||
        apiError.name === "AbortError" ||
        apiError.message.includes("fetch");

      if (isConnectionError) {
        console.log(
          "🔄 ML service unavailable, using fallback recommendations..."
        );
        console.log(`   Error details: ${apiError.message}`);

        // Fallback: return some sample recommendations from the database
        const fallbackPerfumes = await AllPerfume.aggregate([
          { $sample: { size: 6 } }, // Get 6 random perfumes
        ]);

        const validFallbackPerfumes = fallbackPerfumes.map((perfume) => {
          const p = { ...perfume };
          if (!p.name && p.perfume) {
            p.name = p.perfume;
          }
          if (!p.name) {
            p.name = `Perfume ${p.perfumeId || p["ID Perfume"] || p._id}`;
          }

          p.brand = p.brand || "Local Brand";
          p.price = p.price || "Rp 189.000";
          p.volume = p.volume || "30ml";
          p.concentration = p.concentration || "EDT";
          p.description = p.description || p.notes || "Aroma yang memikat";

          return p;
        });

        res.json({
          recommendations: validFallbackPerfumes,
          success: true,
          fallback: true,
          message:
            "Recommendation service unavailable. Showing popular perfumes instead.",
        });
      } else {
        // Other API errors
        throw apiError;
      }
    }
  } catch (error) {
    console.error("Error getting perfume recommendations:", error);
    res.status(500).json({
      message: "Internal server error while fetching recommendations",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
      success: false,
    });
  }
};

// @desc    Get all unique brand names from perfumes
// @route   GET /api/perfumes/brands
// @access  Public
const getPerfumeBrands = async (req, res) => {
  try {
    // Get distinct brand names from AllPerfume collection
    const brands = await AllPerfume.distinct("brand");

    // Filter out null/undefined/empty brands and sort
    const validBrands = brands.filter((brand) => brand && brand.trim()).sort();

    console.log(`Found ${validBrands.length} unique perfume brands`);

    res.json({
      success: true,
      count: validBrands.length,
      data: validBrands,
    });
  } catch (error) {
    console.error("Error fetching perfume brands:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getPerfumes,
  getPerfumeById,
  getPaginatedPerfumes,
  getAllBrands,
  getPerfumesByBrand,
  getPerfumeRecommendations,
  getPerfumeBrands,
};
