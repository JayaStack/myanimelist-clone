import UserAnimeList from "../models/UserAnimeList.js";
import ApiError from "../utils/ApiError.js";

export const addToList = async (userId, animeId, status = "Watching") => {
  if (!animeId) {
    throw new ApiError(400, "Anime ID missing");
  }

  const existing = await UserAnimeList.findOne({
    user: userId,
    anime: animeId,
  });

  if (existing) {
    return existing; // prevent duplicates
  }

  const item = await UserAnimeList.create({
    user: userId,
    anime: animeId,
    status,
  });

  return item;
};

export const getMyList = async (userId) => {
  return await UserAnimeList.find({ user: userId })
    .populate("anime")
    .sort({ updatedAt: -1 });
};

export const updateListItem = async (id, data) => {
  const item = await UserAnimeList.findById(id);
  if (!item) throw new ApiError(404, "List item not found");

  Object.assign(item, data);
  await item.save();
  return item;
};

export const removeFromList = async (id) => {
  const item = await UserAnimeList.findById(id);
  if (!item) throw new ApiError(404, "List item not found");

  await item.deleteOne();
};
