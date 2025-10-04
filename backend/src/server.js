import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectToDB } from "./lib/db.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";
import { seedBots } from "./controllers/auth.controller.js";
// import passport from "passport";
// import "./lib/passport.js";

const PORT = ENV.EXPRESS_SERVER_PORT;


const __dirname = path.resolve();

console.log("server.js entry");

// app.use(passport.initialize());

app.use(express.json({limit: "6mb"})); //for parsing req.body, 6mb max file size
console.log("json parsing enabled..");

app.use(cors({origin: ENV.CLIENT_URL, credentials: true}));  //Cross-Origin Resource Sharing? allows browser requesting resources from different domain, that loaded the page
console.log("cors policy cofigured");

app.use(cookieParser()); //allows parsing cookies
console.log("cookie parser enabled");

app.use("/api/messages", messageRoutes);
console.log("message routes enabled");

app.use("/api/auth", authRoutes);
console.log("authentification routes enabled");



//creates 3 quotes bots
seedBots();
console.log("bots seeded");

//if in deploy - sends frontend page via express server endpoint
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    //app.get("/*",(_,res) => {  // endpoint declaration in express < v5
    app.use((_,res) => { // use this this in express v5+
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
    console.log("production build redirect to the index.html static enabled");
}

server.listen(PORT, () => {
    console.log("trying connecting to the db");
    connectToDB();
    console.log(`Server is up and running on port: ${PORT || 4250}`);
});