import {
  createReview,
  getReviewsByAnime,
  updateReview,
  deleteReview,
} from "../services/reviewService.js";

export const addReview = async (req, res) => {
  const review = await createReview(req.user.id, req.params.animeId, req.body);

  res.status(201).json({ success: true, data: review });
};

export const getAnimeReviews = async (req, res) => {
  const reviews = await getReviewsByAnime(req.params.animeId);
  res.json({ success: true, data: reviews });
};

export const editReview = async (req, res) => {
  const review = await updateReview(req.params.id, req.user.id, req.body);

  res.json({ success: true, data: review });
};

export const removeReview = async (req, res) => {
  await deleteReview(req.params.id, req.user.id);
  res.json({ success: true, message: "Review deleted" });
};
