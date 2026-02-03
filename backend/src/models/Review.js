import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    anime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    text: {
      type: String,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

// One user can review one anime only once
reviewSchema.index({ user: 1, anime: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
