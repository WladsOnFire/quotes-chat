import express from "express";
import { logIn, logOut, signUp, updateProfile, getUserById } from "../controllers/auth.controller.js";
import { checkAuthentification } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection); //recognizes Postman app as bot =) comment for testing



router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/logout", logOut);

//router.get("/:id", getUserById);

router.put("/update-profile", checkAuthentification, updateProfile);

router.get("/checkAuthentification", checkAuthentification, (req, res) => res.status(200).json(req.user));

export default router;