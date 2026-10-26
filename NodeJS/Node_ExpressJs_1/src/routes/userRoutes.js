import express from "express";

import { createUser,
    getAllUser,
    updateUser,
    getUser,
    deleteUser
 } from "../controller/userController.js";
import validateInputText from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/user",validateInputText, createUser);
router.get("/user", getAllUser);
router.put("/user/:id", validateInputText, updateUser);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);

export default router;