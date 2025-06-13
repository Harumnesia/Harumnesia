import Brand from "../models/Brand.js";
import AllPerfume from "../models/AllPerfume.js";

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).sort({ name: 1 });
    res.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single brand
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get perfumes by brand
// @route   GET /api/brands/:id/perfumes
// @access  Public
const getPerfumesByBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Find perfumes by brand name or brandId
    const perfumes = await AllPerfume.find({
      $or: [{ brand: brand.name }, { brandId: brand._id }],
    });

    res.json(perfumes);
  } catch (error) {
    console.error("Error fetching perfumes by brand:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    const createdBrand = await brand.save();
    res.status(201).json(createdBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a brand
// @route   PUT /api/brands/:id
// @access  Private/Admin
const updateBrand = async (req, res) => {
  try {
    const { name, image, description, establishedYear, headquarters, website } =
      req.body;

    const brand = await Brand.findById(req.params.id);

    if (brand) {
      brand.name = name || brand.name;
      brand.image = image || brand.image;
      brand.description = description || brand.description;
      brand.establishedYear = establishedYear || brand.establishedYear;
      brand.headquarters = headquarters || brand.headquarters;
      brand.website = website || brand.website;

      const updatedBrand = await brand.save();
      res.json(updatedBrand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a brand
// @route   DELETE /api/brands/:id
// @access  Private/Admin
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (brand) {
      await brand.deleteOne();
      res.json({ message: "Brand removed" });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getBrands,
  getBrandById,
  getPerfumesByBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
