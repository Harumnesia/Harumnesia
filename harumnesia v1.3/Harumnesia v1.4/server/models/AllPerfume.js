import mongoose from "mongoose";

const allPerfumeSchema = mongoose.Schema(
  {
    perfumeId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    "ID Perfume": {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    formattedPrice: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      required: true,
      default: "30ml",
    },
    concentration: {
      type: String,
      required: true,
      default: "XDP",
    },
    image: {
      type: String,
      required: true,
    },
    gender: {
      type: [String],
      required: true,
    },
    topNotes: {
      type: [String],
      default: [],
    },
    middleNotes: {
      type: [String],
      default: [],
    },
    baseNotes: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    // Fields directly from the database
    "top notes": {
      type: String,
      required: false,
    },
    "mid notes": {
      type: String,
      required: false,
    },
    "base notes": {
      type: String,
      required: false,
    },
    concentrate: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: false,
    },
    situation: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "localdb",
    strict: false, // Allow fields not specified in the schema
  }
);

const AllPerfume = mongoose.model("AllPerfume", allPerfumeSchema);

export default AllPerfume;
