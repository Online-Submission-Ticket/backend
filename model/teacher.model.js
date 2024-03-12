import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {
        teacherID: { 
            type: String, 
            unique: true ,
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        subjects: [{ class: String, subject: String }],
        labs: [{ class: String, subject: String, batch: String }],
        CC: { type: String, default: null },
    },
    {timestamps: true}
);

export default mongoose.model("Teacher", teacherSchema);