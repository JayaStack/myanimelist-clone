import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
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
        index: true,
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
      index: true,
    },
    releaseYear: {
      type: Number,
      index: true,
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

export default mongoose.model("Anime", animeSchema);
