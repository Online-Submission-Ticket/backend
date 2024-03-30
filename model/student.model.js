import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        rollNo: { 
            type: String, 
            unique: true ,
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        attendance: {
            type: Number,
            default: 0,
        },

        UT1Marks: {
            type: Number,
            default: null,
        },

        UT2Marks: {
            type: Number,
            default: null,
        },

        emailID:{
            type: String,
            required: true,
        },

        batch: {
            type: String,
            required: true,
        },

        class: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
