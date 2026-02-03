import {
  addToList,
  getMyList,
  updateListItem,
  removeFromList,
} from "../services/listService.js";
import asyncHandler from "../utils/asyncHandler.js";

export const add = asyncHandler(async (req, res) => {
  const { anime, status } = req.body;

  const item = await addToList(req.user.id, anime, status);

  res.status(201).json({
    success: true,
    data: item,
  });
});

export const myList = asyncHandler(async (req, res) => {
  const list = await getMyList(req.user.id);
  res.status(200).json({ success: true, data: list });
});

export const update = asyncHandler(async (req, res) => {
  const item = await updateListItem(req.params.id, req.body);
  res.status(200).json({ success: true, data: item });
});

export const remove = asyncHandler(async (req, res) => {
  await removeFromList(req.params.id);
  res.status(200).json({ success: true, message: "Removed from list" });
});
