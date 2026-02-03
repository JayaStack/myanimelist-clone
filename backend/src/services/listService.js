import UserAnimeList from "../models/UserAnimeList.js";
import ApiError from "../utils/ApiError.js";

export const addToList = async (userId, data) => {
  const entry = await UserAnimeList.create({
    user: userId,
    anime: data.animeId,
    status: data.status,
  });
  return entry;
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
