import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    coverImage: {
      type: String,
      default: "",
    },
    genres: [
      {
        type: String,
      },
    ],
    studio: {
      type: String,
      default: "",
    },
    episodes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Airing", "Completed", "Upcoming"],
      default: "Upcoming",
    },
    releaseYear: {
      type: Number,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Indexes (all in one place)
animeSchema.index({ title: "text" }); // search
animeSchema.index({ genres: 1 }); // filter
animeSchema.index({ status: 1 }); // filter
animeSchema.index({ releaseYear: 1 }); // filter
animeSchema.index({ averageRating: -1 }); // sort

export default mongoose.model("Anime", animeSchema);
