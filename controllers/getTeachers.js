import Teacher from '../model/teacher.model.js';

export const getTeacherController = async (req, res) => {
    try {
        const { email } = req.params; 

        const teacher = await Teacher.findOne({ emailID: email });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Teacher not found',
            });
        }

        const response = {
            teacherID: teacher.teacherID,
            name: teacher.name,
            emailID: teacher.emailID,
            subjects: teacher.subjects.map(subject => ({ class: subject.class, subject: subject.subject })),
            labs: teacher.labs.map(lab => ({ class: lab.class, subject: lab.subject, batch: lab.batch })),
            CC: teacher.CC || 'Not assigned', 
        };

        res.status(200).json({
            success: true,
            message: 'Teacher details retrieved successfully',
            data: response,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving teacher details',
            error: error.message,
        });
    }
};
