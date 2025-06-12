import InterPerfume from "../models/InterPerfume.js";

// Get all international perfumes (only perfume name and brand)
export const getAllInterPerfumes = async (req, res) => {
  try {
    const perfumes = await InterPerfume.find({}, "Perfume Brand").sort({
      Brand: 1,
      Perfume: 1,
    }); // Sort by brand then perfume name

    res.json({
      success: true,
      count: perfumes.length,
      data: perfumes,
    });
  } catch (error) {
    console.error("Error fetching international perfumes:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching international perfumes",
      error: error.message,
    });
  }
};

// Get unique brands from international perfumes
export const getInterBrands = async (req, res) => {
  try {
    const brands = await InterPerfume.distinct("Brand");
    const sortedBrands = brands.filter((brand) => brand && brand.trim()).sort();

    res.json({
      success: true,
      count: sortedBrands.length,
      data: sortedBrands,
    });
  } catch (error) {
    console.error("Error fetching international brands:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching international brands",
      error: error.message,
    });
  }
};

// Get perfumes by brand
export const getPerfumesByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const perfumes = await InterPerfume.find(
      { Brand: { $regex: new RegExp(brand, "i") } },
      "Perfume Brand"
    ).sort({ Perfume: 1 });

    res.json({
      success: true,
      count: perfumes.length,
      data: perfumes,
    });
  } catch (error) {
    console.error("Error fetching perfumes by brand:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching perfumes by brand",
      error: error.message,
    });
  }
};

// Search perfumes by name
export const searchPerfumes = async (req, res) => {
  try {
    const { q } = req.query; // query parameter
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const perfumes = await InterPerfume.find(
      {
        $or: [
          { Perfume: { $regex: new RegExp(q, "i") } },
          { Brand: { $regex: new RegExp(q, "i") } },
        ],
      },
      "Perfume Brand"
    ).sort({ Brand: 1, Perfume: 1 });

    res.json({
      success: true,
      count: perfumes.length,
      data: perfumes,
    });
  } catch (error) {
    console.error("Error searching perfumes:", error);
    res.status(500).json({
      success: false,
      message: "Error searching perfumes",
      error: error.message,
    });
  }
};

// Get dropdown data (formatted for UI components)
export const getDropdownData = async (req, res) => {
  try {
    const perfumes = await InterPerfume.find({}, "Perfume Brand").sort({
      Brand: 1,
      Perfume: 1,
    });

    // Group by brand for easier dropdown usage
    const groupedData = perfumes.reduce((acc, perfume) => {
      if (!acc[perfume.Brand]) {
        acc[perfume.Brand] = [];
      }
      acc[perfume.Brand].push({
        id: perfume._id,
        name: perfume.Perfume,
        brand: perfume.Brand,
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        grouped: groupedData,
        flat: perfumes.map((p) => ({
          id: p._id,
          name: p.Perfume,
          brand: p.Brand,
          label: `${p.Brand} - ${p.Perfume}`, // Combined label for dropdown
        })),
      },
    });
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dropdown data",
      error: error.message,
    });
  }
};
