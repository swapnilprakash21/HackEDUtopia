import mongoose from "mongoose"

const ChatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    chatID: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    history: [
        {
            role: {
                type: String,
                default: "user"
            },
            parts: [
                {
                    text: {
                        type: String
                    }
                }
            ]
        }
    ]

}, { timestamps: true })

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema)