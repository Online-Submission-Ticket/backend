import Teacher from "../model/teacher.model.js";
import Student from "../model/student.model.js";

// Controller function to toggle lab status
export const approveLabController = async (req, res) => {
    try {
        const { teacherId, labName, rollNo, batch } = req.params;
        console.log("Request Parameters:", teacherId, labName, rollNo, batch);
        // Check if any required parameter is null
        if (!teacherId || !labName || !rollNo || !batch) {
            return res.status(400).json({
                success: false,
                message: 'One or more required parameters are missing',
            });
        }

        const teacher = await Teacher.findOne({ teacherID: teacherId, "labs.subject": labName, "labs.batch": batch });
        console.log("Teacher:", teacher);

        const student = await Student.findOne({ rollNo: rollNo, batch: batch, "labs.labName": labName });
        console.log("Student:", student);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found or lab not associated with this teacher, subject, and batch',
            });
        }

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found or lab not associated with this student, labName, and batch',
            });
        }

        // Check if the teacher teaches the subject corresponding to the lab for this student's class
        const teachesSubject = teacher.labs.some(lab => lab.subject === labName && lab.class === student.class && lab.batch === batch);

        console.log("Teaches Subject:", teachesSubject);


        if (!teachesSubject) {
            return res.status(403).json({
                success: false,
                message: 'Teacher is not teaching the subject to the student\'s class',
            });
        }

        const labIndex = student.labs.findIndex(lab => lab.labName === labName);
        student.labs[labIndex].labStatus = !student.labs[labIndex].labStatus;

        await student.save();

        return res.status(200).json({
            success: true,
            message: `Lab status toggled for student ${rollNo}`,
            data: {
                student,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error toggling lab status',
            error: error.message,
        });
    }
};