import {
  createAnime,
  getAllAnime,
  getAnimeById,
  deleteAnime,
} from "../services/animeService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const create = asyncHandler(async (req, res) => {
  const anime = await createAnime(req.body);
  res.status(201).json({ success: true, data: anime });
});

export const getAll = asyncHandler(async (req, res) => {
  const anime = await getAllAnime();
  res.status(200).json({ success: true, data: anime });
});

export const getOne = asyncHandler(async (req, res) => {
  const anime = await getAnimeById(req.params.id);
  res.status(200).json({ success: true, data: anime });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteAnime(req.params.id);
  res.status(200).json({ success: true, message: "Anime deleted" });
});
