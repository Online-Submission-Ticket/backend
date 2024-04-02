import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
        subjectName: { 
            type: String, 
            required: true
        },
        UT1Marks: { 
            type: Number, 
            default: null
        },
        UT2Marks: { 
            type: Number, 
            default: null
        },
        attendance: { 
            type: Number, 
            default: 0
        },
        status: { 
            type: Boolean, 
            default: false
        }
    },
    { _id: false }
);

const labSchema = new mongoose.Schema(
    {
        labName: { 
            type: String, 
            required: true
        },
        labAttendance: { 
            type: Number, 
            default: 0
        },
        labStatus: { 
            type: Boolean, 
            default: false
        }
    },
    { _id: false }
);

const studentSchema = new mongoose.Schema(
    {
        rollNo: { 
            type: String, 
            unique: true ,
            required: true
        },
        name: { 
            type: String, 
            required: true 
        },
        subjects: [subjectSchema],
        labs: [labSchema],
        emailID: { 
            type: String, 
            required: true 
        },
        batch: { 
            type: String, 
            required: true 
        },
        attendance:{
            type : Number,
            default : 0,
            required: true
        },
        class: { 
            type: String, 
            required: true 
        },
        submissionStatus: { 
            type: Boolean, 
            default: false 
        },
        password:{
            type : String ,
            default : null,
        },
        isPasswordSet:{
            type : Boolean,
            default : false,
        },
       
    },
    { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
