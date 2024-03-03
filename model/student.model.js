import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        password:{
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        roll_no:{
            type: Number,
            required: true,
        },

        division:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

export default mongoose.model("users", userSchema);