import express from "express";
import auth from "../middleware/auth.js";
import {
  addReview,
  getAnimeReviews,
  editReview,
  removeReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/:animeId", auth, addReview);
router.get("/:animeId", getAnimeReviews);
router.put("/:id", auth, editReview);
router.delete("/:id", auth, removeReview);

export default router;
