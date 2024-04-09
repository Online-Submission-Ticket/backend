import Student from '../model/student.model.js';

export const getStudentByRollNoController = async (req, res) => {
    try {
        const { emailID } = req.params; 

        const student = await Student.findOne({ emailID });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found',
            });
        }
        const { createdAt, updatedAt, __v , ...relevantData } = student._doc;

        res.status(200).json({
            success: true,
            message: 'Student details retrieved successfully',
            data: relevantData,
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
