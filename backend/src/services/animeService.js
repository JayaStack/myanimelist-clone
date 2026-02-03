import Anime from "../models/Anime.js";
import ApiError from "../utils/ApiError.js";

export const createAnime = async (data) => {
  const exists = await Anime.findOne({ title: data.title });
  if (exists) throw new ApiError(400, "Anime already exists");

  return await Anime.create(data);
};

export const getAllAnime = async () => {
  return await Anime.find().sort({ createdAt: -1 });
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
