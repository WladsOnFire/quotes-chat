import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

    const {JWT_SECRET, NODE_ENV} = process.env;
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in .env");
    if (!NODE_ENV) throw new Error("NODE_ENV is not set in .env");

    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in ms
        httpOnly: true, //prevents XSS attacks, token will be available only via http, no js access: cross-site scripting
        sameSite: "strict", //CSRF attacks. Denies requests from other websites
        secure: NODE_ENV === "development" ? false : true, // http://localhost... : https://hostDomain... 
    });

    return token;
}