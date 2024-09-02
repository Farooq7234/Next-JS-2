import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    isVerified: {
        type: Boolean,
        default: fasle
    },
    isAdmin: {
        type: Boolean,
        default: fasle
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)


export default User