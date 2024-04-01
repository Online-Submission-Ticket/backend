import Student from '../model/student.model.js';

export const getStudentByRollNoController = async (req, res) => {
    try {
        const { rollNo } = req.params; 

        const student = await Student.findOne({ rollNo });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student details retrieved successfully',
            data: student,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving student details',
            error: error.message,
        });
    }
};
