import express from "express";
import { validateUser } from "../controller/authController.js";
import { validateLogin } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/login",validateLogin, validateUser);

export default router;