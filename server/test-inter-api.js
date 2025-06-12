// Test script for International Perfume API
import dotenv from "dotenv";
import mongoose from "mongoose";
import InterPerfume from "./models/InterPerfume.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv
dotenv.config({
  path: path.join(__dirname, ".env"),
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Test functions
const testInterPerfumeAPI = async () => {
  try {
    await connectDB();

    console.log("🧪 Testing International Perfume API...\n");

    // Test 1: Get all perfumes count
    console.log("1. Testing getAllInterPerfumes...");
    const allPerfumes = await InterPerfume.find({}, "Perfume Brand").sort({
      Brand: 1,
      Perfume: 1,
    });
    console.log(`   Found ${allPerfumes.length} international perfumes`);
    console.log(
      `   Sample: ${allPerfumes[0]?.Brand} - ${allPerfumes[0]?.Perfume}\n`
    );

    // Test 2: Get unique brands
    console.log("2. Testing getInterBrands...");
    const brands = await InterPerfume.distinct("Brand");
    const sortedBrands = brands.filter((brand) => brand && brand.trim()).sort();
    console.log(`   Found ${sortedBrands.length} unique brands`);
    console.log(`   Sample brands: ${sortedBrands.slice(0, 5).join(", ")}\n`);

    // Test 3: Get perfumes by brand (test with first brand)
    if (sortedBrands.length > 0) {
      const testBrand = sortedBrands[0];
      console.log(`3. Testing getPerfumesByBrand with "${testBrand}"...`);
      const brandPerfumes = await InterPerfume.find(
        { Brand: { $regex: new RegExp(testBrand, "i") } },
        "Perfume Brand"
      ).sort({ Perfume: 1 });
      console.log(
        `   Found ${brandPerfumes.length} perfumes for brand "${testBrand}"`
      );
      console.log(`   Sample: ${brandPerfumes[0]?.Perfume}\n`);
    }

    // Test 4: Search functionality
    console.log('4. Testing searchPerfumes with query "cherry"...');
    const searchResults = await InterPerfume.find(
      {
        $or: [
          { Perfume: { $regex: new RegExp("cherry", "i") } },
          { Brand: { $regex: new RegExp("cherry", "i") } },
        ],
      },
      "Perfume Brand"
    ).sort({ Brand: 1, Perfume: 1 });
    console.log(`   Found ${searchResults.length} perfumes matching "cherry"`);
    if (searchResults.length > 0) {
      console.log(
        `   Sample: ${searchResults[0]?.Brand} - ${searchResults[0]?.Perfume}\n`
      );
    }

    // Test 5: Dropdown data format
    console.log("5. Testing dropdown data format...");
    const dropdownPerfumes = await InterPerfume.find({}, "Perfume Brand")
      .sort({ Brand: 1, Perfume: 1 })
      .limit(5); // Just get first 5 for testing

    const groupedData = dropdownPerfumes.reduce((acc, perfume) => {
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

    const flatData = dropdownPerfumes.map((p) => ({
      id: p._id,
      name: p.Perfume,
      brand: p.Brand,
      label: `${p.Brand} - ${p.Perfume}`,
    }));

    console.log("   Grouped data structure:");
    console.log("   ", JSON.stringify(Object.keys(groupedData), null, 2));
    console.log("   Flat data sample:");
    console.log("   ", flatData[0]);

    console.log("\n✅ All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

// Run tests
testInterPerfumeAPI();
