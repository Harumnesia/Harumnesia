import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import AllPerfume from "./models/AllPerfume.js";
import Brand from "./models/Brand.js";

dotenv.config();

connectDB();

const sampleBrands = [
  {
    name: "HMNS",
    image: "hmns-logo.jpg",
    description:
      "Brand parfum lokal premium dengan fokus pada bahan-bahan berkualitas dan aroma yang tahan lama.",
    establishedYear: 2018,
    headquarters: "Jakarta, Indonesia",
    website: "www.hmns.co",
  },
  {
    name: "Soft And Co",
    image: "softandco-logo.jpg",
    description:
      "Brand parfum yang menghadirkan aroma lembut dan elegan untuk kegiatan sehari-hari.",
    establishedYear: 2019,
    headquarters: "Bandung, Indonesia",
    website: "www.softandco.id",
  },
  {
    name: "Kenwood",
    image: "kenwood-logo.jpg",
    description: "Brand parfum dengan inspirasi aroma alam dan kesan mewah.",
    establishedYear: 2020,
    headquarters: "Surabaya, Indonesia",
    website: "www.kenwood.id",
  },
  {
    name: "Valorant",
    image: "valorant-logo.jpg",
    description:
      "Brand parfum dengan aroma segar dan modern untuk jiwa petualang.",
    establishedYear: 2017,
    headquarters: "Jakarta, Indonesia",
    website: "www.valorant.co.id",
  },
  {
    name: "Belleza",
    image: "belleza-logo.jpg",
    description: "Brand parfum premium dengan sentuhan oriental yang khas.",
    establishedYear: 2016,
    headquarters: "Yogyakarta, Indonesia",
    website: "www.belleza.id",
  },
];

const samplePerfumes = [
  {
    brand: "HMNS",
    name: "Farhampton",
    price: 189000,
    formattedPrice: "Rp 189.000",
    volume: "30ml",
    concentration: "XDP",
    image: "farhampton.jpg",
    gender: ["Pria", "Siang"],
    topNotes: ["Lemon", "Bergamot", "Orange"],
    middleNotes: ["Lavender", "Rosemary", "Geranium"],
    baseNotes: ["Vanilla", "Musk", "Amber"],
    description:
      "Aroma segar dengan sentuhan citrus yang cocok untuk aktivitas siang hari.",
    isLocal: true,
  },
  {
    brand: "HMNS",
    name: "Luminos",
    price: 189000,
    formattedPrice: "Rp 189.000",
    volume: "30ml",
    concentration: "XDP",
    image: "luminos.jpg",
    gender: ["Pria", "Malam"],
    topNotes: ["Lemon", "Bergamot", "Grapefruit"],
    middleNotes: ["Cedar", "Jasmine", "Patchouli"],
    baseNotes: ["Sandalwood", "Musk", "Amber"],
    description:
      "Aroma woody yang elegan dengan sentuhan citrus segar di awal.",
    isLocal: true,
  },
  {
    brand: "Soft And Co",
    name: "CHNO",
    price: 189000,
    formattedPrice: "Rp 189.000",
    volume: "30ml",
    concentration: "XDP",
    image: "chno.jpg",
    gender: ["Wanita", "Siang"],
    topNotes: ["Lemon", "Bergamot", "Lavender", "Lime", "Mint"],
    middleNotes: ["Rose", "Jasmine", "Ylang-ylang", "Geranium", "Orchid"],
    baseNotes: ["Vanilla", "Musk", "Sandalwood", "Amber", "Cedar"],
    description:
      "Aroma floral yang feminin dengan sentuhan citrus yang menyegarkan.",
    isLocal: true,
  },
  {
    brand: "Kenwood",
    name: "Azuria",
    price: 210000,
    formattedPrice: "Rp 210.000",
    volume: "30ml",
    concentration: "EDP",
    image: "azuria.jpg",
    gender: ["Wanita", "Malam"],
    topNotes: ["Raspberry", "Blackcurrant", "Bergamot"],
    middleNotes: ["Rose", "Peony", "Magnolia"],
    baseNotes: ["Patchouli", "Vanilla", "White Musk"],
    description:
      "Aroma buah yang manis diikuti dengan keharuman bunga yang anggun, cocok untuk malam hari.",
    isLocal: true,
  },
  {
    brand: "Valorant",
    name: "Elysium",
    price: 175000,
    formattedPrice: "Rp 175.000",
    volume: "30ml",
    concentration: "EDT",
    image: "elysium.jpg",
    gender: ["Unisex", "Siang"],
    topNotes: ["Green Apple", "Mandarin", "Mint"],
    middleNotes: ["Lavender", "Geranium", "Marine Accord"],
    baseNotes: ["Amber", "Cedar", "Moss"],
    description:
      "Aroma segar dan modern dengan sentuhan aquatic yang cocok untuk semua gender.",
    isLocal: true,
  },
  {
    brand: "Belleza",
    name: "Noir",
    price: 250000,
    formattedPrice: "Rp 250.000",
    volume: "30ml",
    concentration: "Parfum",
    image: "noir.jpg",
    gender: ["Pria", "Malam"],
    topNotes: ["Black Pepper", "Cardamom", "Nutmeg"],
    middleNotes: ["Leather", "Incense", "Tobacco"],
    baseNotes: ["Oud", "Vanilla", "Amber"],
    description:
      "Aroma maskulin yang kuat dan misterius dengan sentuhan rempah oriental.",
    isLocal: true,
  },
  // Add some international perfumes for testing
  {
    brand: "Dior",
    name: "Sauvage",
    price: 1800000,
    formattedPrice: "Rp 1.800.000",
    volume: "100ml",
    concentration: "EDT",
    image: "sauvage.jpg",
    gender: ["Pria", "Siang"],
    topNotes: ["Bergamot", "Pepper"],
    middleNotes: ["Sichuan Pepper", "Lavender", "Star Anise"],
    baseNotes: ["Ambroxan", "Cedar", "Labdanum"],
    description: "A fresh, raw and noble fragrance with a wild twist.",
    isLocal: false,
  },
  {
    brand: "Chanel",
    name: "No. 5",
    price: 2200000,
    formattedPrice: "Rp 2.200.000",
    volume: "100ml",
    concentration: "EDP",
    image: "chanel5.jpg",
    gender: ["Wanita", "Malam"],
    topNotes: ["Ylang-ylang", "Lemon", "Bergamot", "Amalfi Lemon"],
    middleNotes: ["Jasmine", "Rose", "Lily-of-the-Valley"],
    baseNotes: ["Iris", "Vetiver", "Sandalwood", "Vanilla"],
    description:
      "The world's most iconic fragrance - timeless and sophisticated.",
    isLocal: false,
  },
];

const importData = async () => {
  try {
    // Clear existing data
    await AllPerfume.deleteMany();
    await Brand.deleteMany();

    // Insert brands
    const createdBrands = await Brand.insertMany(sampleBrands);

    // Create a map of brand names to their IDs
    const brandMap = {};
    createdBrands.forEach((brand) => {
      brandMap[brand.name] = brand._id;
    });

    // Add brandId to perfumes
    const perfumesWithBrandIds = samplePerfumes.map((perfume) => {
      return {
        ...perfume,
        brandId: brandMap[perfume.brand],
      };
    });

    // Insert sample perfumes with brand references
    await AllPerfume.insertMany(perfumesWithBrandIds);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear all data
    await AllPerfume.deleteMany();
    await Brand.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments to determine action
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
