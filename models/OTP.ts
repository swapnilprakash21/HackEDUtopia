import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema);