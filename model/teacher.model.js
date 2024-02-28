import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema(
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
    },
    {timestamps: true}
);

export default mongoose.model("teachers", TeacherSchema);