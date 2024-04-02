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
        if (!students) {
            return res.status(404).json({
                success: false,
                message: `Student not found for the ${batch} batch`,
            });
        }


        //data of stu which we want to show
        const formattedStudents = students.map(student => ({
            rollNo: student.rollNo,
            name: student.name,
            class: student.class,
            batch: student.batch,
            emailID: student.emailID,
            attendance: student.attendance,
            labs: student.labs.filter(studentLab => {
                // Check if the labName from student's data exists in the teacher's lab data
                return teacher.labs.some(teacherLab => teacherLab.subject === studentLab.labName);
            }),
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


//for theory subjects
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
        const formattedStudents = students.map(student => {
            const relevantSubjects = student.subjects.filter(subject => {
                return teacher.subjects.some(teacherSubject => {
                    return teacherSubject.subject === subject.subjectName && teacherSubject.class === Class;
                });
            });

            return {
                rollNo: student.rollNo,
                name: student.name,
                class: student.class,
                batch: student.batch,
                attendance: student.attendance,
                emailID: student.emailID,
                subjects: relevantSubjects,
            };
        });

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


//for cc
export const connectStuToCCController = async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Find the teacher based on the teacher ID
        const teacher = await Teacher.findOne({ teacherID: teacherId });
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        // Check if the CC class is assigned
        if (!teacher.CC) {
            return res.status(404).json({
                success: false,
                message: 'No class assigned as CC',
            });
        }

        // Retrieve students from the CC class
        const students = await Student.find({ class: teacher.CC });

        // Format student data
        const formattedStudents = students.map(student => ({
            rollNo: student.rollNo,
            name: student.name,
            subjects: student.subjects,
            labs: student.labs,
            emailID: student.emailID,
            batch: student.batch,
            attendance: student.attendance,
            class: student.class,
            submissionStatus: student.submissionStatus,
        }));

        return res.status(200).json({
            success: true,
            message: `Students found for the CC class of teacher ${teacherId}`,
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
