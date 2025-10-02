import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectToDB } from "./lib/db.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ENV } from "./lib/env.js";

const PORT = ENV.EXPRESS_SERVER_PORT;
const __dirname = path.resolve();

const app = express();

app.use(express.json({limit: "6mb"})); //for parsing req.body, 6mb max file size
app.use(cors()); //Cross-Origin Resource Sharing? allows browser requesting resources from different domain, that loaded the page
app.use(cookieParser()); //allows parsing cookies


app.use("/api/auth", authRoutes);

//if in deploy - sends frontend page via express server endpoint
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    //app.get("/*",(_,res) => {  // endpoint declaration in express < v5
    app.use((_,res) => { // use this this in express v5+
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is up and running on port: ${PORT || 3000}`);
});