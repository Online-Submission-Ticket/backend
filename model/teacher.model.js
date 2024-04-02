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

        emailID:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type : String ,
            default : null,
        },
        isPasswordSet:{
            type : Boolean,
            default : false,
        },
        subjects: [{ class: String, subject: String }],
        labs: [{ class: String, subject: String, batch: String }],
        CC: { type: String, default: null },
    },
    {timestamps: true}
);

export default mongoose.model("Teacher", teacherSchema);