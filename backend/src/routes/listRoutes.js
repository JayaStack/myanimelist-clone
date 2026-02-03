import express from "express";
import auth from "../middleware/auth.js";
import { add, myList, update, remove } from "../controllers/listController.js";

const router = express.Router();

router.post("/", auth, add);
router.get("/my-list", auth, myList);
router.put("/:id", auth, update);
router.delete("/:id", auth, remove);

export default router;
