import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../controllers/auth.controller";

const router = express.Router();

router.get("/", verifyJWT, getUsers);
router.post("/", verifyJWT, createUser);
router.get("/:id", verifyJWT, getUser);
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;
