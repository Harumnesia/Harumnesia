import AllPerfume from "../models/AllPerfume.js";

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

export {
  getPerfumes,
  getPerfumeById,
  getPaginatedPerfumes,
  getAllBrands,
  getPerfumesByBrand,
};
