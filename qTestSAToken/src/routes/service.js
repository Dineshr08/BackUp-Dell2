import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { fetchToken } from "../controller/serviceController.js";
import { validateServiceRequest } from "../middleware/inputValidator.js";


const router = express.Router();

router.post("/token",verifyToken, validateServiceRequest ,fetchToken);

export default router;