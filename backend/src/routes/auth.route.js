import express from "express";
import { logIn, logOut, signUp, updateProfile, getUserById, setAlias } from "../controllers/auth.controller.js";
import { checkAuthentification } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import passport from "passport";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";

const router = express.Router();

router.use(arcjetProtection); //recognizes Postman app as bot =) comment for testing



// redirect user to Google login
// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );

// Google callback
// router.get(
//     "/google/callback",
//     passport.authenticate("google", { failureRedirect: "/login", session: false  }),
//     (req, res) => {
//         // successfull authorization
//         console.log("check ");
//         generateToken(req.user._id, res);
//         //res.redirect(`${ENV.CLIENT_URL}`); // redirect to frontend
//     }
// );

router.post("/signup", signUp);

router.post("/login", logIn);

router.post("/logout", logOut);

router.put("/users/:id/alias", checkAuthentification, setAlias);

//router.get("/:id", getUserById);

router.put("/update-profile", checkAuthentification, updateProfile);

router.get("/checkAuthentification", checkAuthentification, (req, res) => res.status(200).json(req.user));

export default router;