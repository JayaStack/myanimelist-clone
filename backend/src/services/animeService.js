import Anime from "../models/Anime.js";
import ApiError from "../utils/ApiError.js";

export const createAnime = async (data) => {
  const exists = await Anime.findOne({ title: data.title });
  if (exists) throw new ApiError(400, "Anime already exists");

  return await Anime.create(data);
};

// export const getAllAnime = async () => {
//   return await Anime.find().sort({ createdAt: -1 });
// };

export const getAllAnime = async (query) => {
  const { search, genre, status, page = 1, limit = 10, sort } = query;

  const filter = {};

  if (search) {
    filter.$text = { $search: search };
  }

  if (genre) {
    filter.genres = genre;
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  let sortOption = { createdAt: -1 };

  if (sort === "rating") {
    sortOption = { averageRating: -1 };
  }

  if (sort === "latest") {
    sortOption = { createdAt: -1 };
  }

  const anime = await Anime.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await Anime.countDocuments(filter);

  return {
    data: anime,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  };
};

export const getAnimeById = async (id) => {
  const anime = await Anime.findById(id);
  if (!anime) throw new ApiError(404, "Anime not found");
  return anime;
};

export const deleteAnime = async (id) => {
  const anime = await Anime.findById(id);
  if (!anime) throw new ApiError(404, "Anime not found");
  await anime.deleteOne();
};
