import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const conclusion = await aj.protect(req);

        //req rate limit, bot, other reasons 
        if (conclusion.isDenied()) {
            if (conclusion.reason.isRateLimit()) {
                return res.status(429).json({ message: "Requests rate limited. Try later" }); //code 429 too many requests
            } else if (conclusion.reason.isBot()) {
                return res.status(403).json({ message: "Bot request denied" }); //code 403 Forbidden
            } else {
                return res.status(403).json({ message: "Access denied by security rules" });
            }
        }

        //anti spoofing
        if (conclusion.results.some(isSpoofedBot)) { 
            return res.status(403).json({ message: "Spoof bot activity detected" });
        }

        next();

    } catch (error) {
        console.log("Arcjet protection middleware error: ", error);
        next();
    }
};