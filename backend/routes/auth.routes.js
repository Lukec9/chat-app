import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { validateUser } from "../middleware/middleware.js";

const router = express.Router();

router.post("/signup", validateUser, signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
