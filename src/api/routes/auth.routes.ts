import express from "express";
import {
  apiLogin,
  apiLogout,
  apiRegister,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", apiRegister);
router.post("/login", apiLogin);
router.get("/logout", apiLogout);

export default router;
