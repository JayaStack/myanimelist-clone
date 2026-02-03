import mongoose from "mongoose";

const userAnimeListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    anime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"],
      default: "Plan to Watch",
    },
    personalRating: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
    },
    watchedEpisodes: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      maxLength: 500,
      default: "",
    },
  },
  { timestamps: true },
);

// Prevent duplicate (one anime once per user)
userAnimeListSchema.index({ user: 1, anime: 1 }, { unique: true });

export default mongoose.model("UserAnimeList", userAnimeListSchema);
