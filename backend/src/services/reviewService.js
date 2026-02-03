import Review from "../models/Review.js";
import Anime from "../models/Anime.js";

export const createReview = async (userId, animeId, data) => {
  const review = await Review.create({
    user: userId,
    anime: animeId,
    rating: data.rating,
    text: data.text,
  });

  await updateAnimeRating(animeId);
  return review;
};

export const getReviewsByAnime = async (animeId) => {
  return Review.find({ anime: animeId }).populate("user", "username");
};

export const updateReview = async (reviewId, userId, data) => {
  const review = await Review.findOne({
    _id: reviewId,
    user: userId,
  });

  if (!review) throw new Error("Review not found");

  review.rating = data.rating ?? review.rating;
  review.text = data.text ?? review.text;
  await review.save();

  await updateAnimeRating(review.anime);
  return review;
};

export const deleteReview = async (reviewId, userId) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    user: userId,
  });

  if (!review) throw new Error("Review not found");

  await updateAnimeRating(review.anime);
};

const updateAnimeRating = async (animeId) => {
  const stats = await Review.aggregate([
    { $match: { anime: animeId } },
    {
      $group: {
        _id: "$anime",
        avg: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Anime.findByIdAndUpdate(animeId, {
      averageRating: stats[0].avg,
      ratingCount: stats[0].count,
    });
  } else {
    await Anime.findByIdAndUpdate(animeId, {
      averageRating: 0,
      ratingCount: 0,
    });
  }
};
