import Teacher from "../model/teacher.model.js";
import Student from "../model/student.model.js";

//for labs
export const connectStuToLabTeacherController = async (req, res) => {
    try{
        const {teacherId, batch } = req.params;

        // Find the teacher's batch based on the teacher ID
        const teacher = await Teacher.findOne({ teacherID: teacherId });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        // Check if the specified batch matches any of the teacher's lab batches
        const labBatch = teacher.labs.find(lab => lab.batch === batch);
        if (!labBatch) {
            // If no matching lab batch is found
            return res.status(404).json({
                success: false,
                message: 'No matching lab batch found',
            });
        }

        // If a matching lab batch is found, retrieve all students from that batch
        const students = await Student.find({ batch });

        //data of stu which we want to show
        const formattedStudents = students.map(student => ({
            rollNo: student.rollNo,
            name: student.name,
            attendance: student.attendance,
            UT1Marks: student.UT1Marks,
            UT2Marks: student.UT2Marks,
            emailID: student.emailID,
        }));

        return res.status(200).json({
            success: true,
            message: `Students found for the ${batch} batch and teacher`,
            data: {
                formattedStudents,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error connecting students to teacher',
            error: error.message,
        });
    }
};


//for cc and theory subjects
export const connectStuToTheoryController = async (req, res) => {
    try {
        const { teacherId, class: Class } = req.params;

        // Find the teacher based on the teacher ID
        const teacher = await Teacher.findOne({ teacherID: teacherId });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        // Check if the specified class matches any of the teacher's classes
        const teacherClass = teacher.subjects.find(subject => subject.class === Class);
        if (!teacherClass) {
            // If no matching class is found
            return res.status(404).json({
                success: false,
                message: 'No matching class found',
            });
        }

        // If a matching class is found, retrieve all students from that class
        const students = await Student.find({ class: Class });

        //data of students which we want to show
        const formattedStudents = students.map(student => ({
            rollNo: student.rollNo,
            name: student.name,
            attendance: student.attendance,
            UT1Marks: student.UT1Marks,
            UT2Marks: student.UT2Marks,
            emailID: student.emailID,
        }));

        return res.status(200).json({
            success: true,
            message: `Students found for the ${Class} class`,
            data: {
                formattedStudents,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error connecting students to teacher',
            error: error.message,
        });
    }
};
