import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            trim: true, 
            maxlength: 1500,
        },
        image: {
            type: String
        },
    },
    { timestamps: true } // createdAt & updatedAt
);

const Message = mongoose.model("Message", messageSchema);

export default Message;