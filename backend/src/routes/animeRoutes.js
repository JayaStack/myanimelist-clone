import express from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  create,
  getAll,
  getOne,
  remove,
} from "../controllers/animeController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);

// admin only
router.post("/", auth, isAdmin, create);
router.delete("/:id", auth, isAdmin, remove);

export default router;
