import Teacher from "../model/teacher.model.js";
import Student from "../model/student.model.js";

// for lab submission
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


//for theory
export const approveTheoryController = async (req, res) => {
    try {
        const { teacherId, subjectName, rollNo } = req.params;
        console.log("Request Parameters:", teacherId, subjectName, rollNo);

        if (!teacherId || !subjectName || !rollNo) {
            return res.status(400).json({
                success: false,
                message: 'One or more required parameters are missing',
            });
        }

        // Find the teacher
        const teacher = await Teacher.findOne({ teacherID: teacherId, "subjects.subject": subjectName });
        console.log("Teacher:", teacher);

        // Find the student
        const student = await Student.findOne({ rollNo: rollNo, "subjects.subjectName": subjectName });
        console.log("Student:", student);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found or does not teach the subject',
            });
        }

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found or does not have the subject',
            });
        }

        // Check if the teacher teaches the subject to the student's class
        const teachesSubject = teacher.subjects.some(subject => subject.subject === subjectName && subject.class === student.class);
        console.log("Teaches Subject:", teachesSubject);

        if (!teachesSubject) {
            return res.status(403).json({
                success: false,
                message: 'Teacher is not teaching the subject to the student\'s class',
            });
        }

        // Toggle status
        const subjectIndex = student.subjects.findIndex(sub => sub.subjectName === subjectName);
        student.subjects[subjectIndex].status = !student.subjects[subjectIndex].status;

        // Save the updated student data
        await student.save();

        return res.status(200).json({
            success: true,
            message: `Theory subject status toggled for student ${rollNo}`,
            data: {
                student,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error toggling theory subject status',
            error: error.message,
        });
    }
};

// for cc
export const approveSubmissionController = async (req, res) => {
    try {
        const { teacherId, rollNo } = req.params;
        console.log("Request Parameters:", teacherId, rollNo);
        
        // Check if any required parameter is null
        if (!teacherId || !rollNo) {
            return res.status(400).json({
                success: false,
                message: 'One or more required parameters are missing',
            });
        }

        const teacher = await Teacher.findOne({ teacherID: teacherId, CC: { $exists: true } });
        console.log("Teacher:", teacher);

        // Check if the teacher is not found or not the Class Coordinator
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found or is not the Class Coordinator',
            });
        }

        const student = await Student.findOne({ rollNo: rollNo });

        // Check if the student is not found
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        // Check if the student belongs to the class of the teacher
        if (student.class !== teacher.CC) {
            return res.status(403).json({
                success: false,
                message: 'Student does not belong to the class of the teacher',
            });
        }

        // Toggle the submission status of the student
        student.submissionStatus = !student.submissionStatus;

        await student.save();

        return res.status(200).json({
            success: true,
            message: `Submission status toggled for student ${rollNo}`,
            data: {
                student,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error toggling submission status',
            error: error.message,
        });
    }
};
