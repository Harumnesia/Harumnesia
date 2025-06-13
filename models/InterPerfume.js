import mongoose from "mongoose";

const interPerfumeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    Perfume: {
      type: String,
      required: true,
    },
    Brand: {
      type: String,
      required: true,
    },
    // Other fields are included in the schema but we'll only select what we need
    url: String,
    Country: String,
    Gender: String,
    "Rating Value": String,
    "Rating Count": String,
    Year: String,
    Top: [String],
    Middle: [String],
    Base: [String],
    Perfumer1: String,
    Perfumer2: String,
    mainaccord1: String,
    mainaccord2: String,
    mainaccord3: String,
    mainaccord4: String,
    mainaccord5: String,
  },
  {
    collection: "interdb", // Explicitly specify the collection name
  }
);

export default mongoose.model("InterPerfume", interPerfumeSchema, "interdb");
