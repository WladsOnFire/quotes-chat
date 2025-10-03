import express from "express";
import {
    getAllContacts,
    getChatPartners,
    getMessagesByUserId,
    sendMessage,
} from "../controllers/message.controller.js";
import { checkAuthentification } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

//arcjet protection + jwt authentification required for these routes
router.use(arcjetProtection, checkAuthentification);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;