import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";

export const logOut = async (_, res) => {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"});
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id).select("-password"); // no pass

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const seedBots = async () => {
    try {
    const bots = [
      { fullName: "QuotesBot Harry", email: "quotesbot1@system.local", isQuotesBot: true},
      { fullName: "QuotesBot Mike", email: "quotesbot2@system.local", isQuotesBot: true },
      { fullName: "QuotesBot Milena", email: "quotesbot3@system.local",isQuotesBot: true },
    ];

    for (const bot of bots) {
      const exists = await User.findOne({ email: bot.email });
      if (!exists) {
        const newBot = new User({
          fullName: bot.fullName,
          email: bot.email,
          password: await bcrypt.hash(ENV.BOTPASS, 12),
          profilePic: "https://api.dicebear.com/7.x/bottts/svg",
          ...bot,
        });
        await newBot.save();
        console.log(`Created bot: ${bot.fullName}`);
      } else {
        console.log(`Bot already exists: ${bot.fullName}`);
      }
    }
  } catch (error) {
    console.error("Error seeding bots:", error);
  }
}


export const logIn = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid entry data"});

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return res.status(400).json({message: "Invalid entry data"});

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error occured in auth controller:",error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email, !password) {
            return res.status(400).json({ message: "All fields are required" }); // code 400 - bad request
        }

        const fullNameRegex = /^[a-zA-Z]+(?:[' -][a-zA-Z]+)* [a-zA-Z]+(?:[' -][a-zA-Z]+)*$/;
        if (!fullNameRegex.test(fullName)) {
            return res.status(400).json({ message: "Full name should be provided correctly" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password minimal length is 8 characters" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Provided email already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const resultUser = new User({
            fullName,
            email,
            password: hashedPassword
        })

        if (resultUser) {

            await resultUser.save();
            generateToken(resultUser._id, res);

            res.status(201).json({
                _id: resultUser._id,
                fullName: resultUser.fullName,
                email: resultUser.email,
                profilePic: resultUser.profilePic,
            }); //code 201 - created successfully

            const {CLIENT_URL} = process.env;
            if(!CLIENT_URL) throw new Error("CLIENT_URL is not set in .env");
            
            try {
                await sendWelcomeEmail(resultUser.email, resultUser.fullName, CLIENT_URL);
            } catch (error){
                console.log("Failed to send welcome email:", error);
            }
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Sign up error occured in auth controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        if(!profilePic) return res.status(400).json({ message: "Provide wanted profile picture"});

        const userId = req.user._id;

        const updateRes = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {profilePic: updateRes.secure_url},
            {new: true}
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error occured while updating user profile:",error);
        res.status(500).json({ message: "Internal server error" });
    }
}