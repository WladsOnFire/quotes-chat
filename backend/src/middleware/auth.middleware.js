import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ENV} from "../lib/env.js";

export const checkAuthentification = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message: "Unauthorized user, token not provided"});

        const decodedToken = jwt.verify(token, ENV.JWT_SECRET);
        if (!decodedToken) return res.status(401).json({message: "Unauthorized user, token is invalid"});

        const user = await User.findById(decodedToken.userId).select("-password"); //we don't pass password in next() callback
        if (!user) return res.status(404).json({message: "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log("Error occured in authentification middleware:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

