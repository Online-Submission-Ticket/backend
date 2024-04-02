import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },

        password:{
            type: String,
            default : null,
        },
    },
    {timestamps: true}
);

export default mongoose.model("users", userSchema);