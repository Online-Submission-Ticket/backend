import Student from '../model/student.model.js';

export const deleteAllStudentsController = async (req, res) => {
    
    try {
        await Student.deleteMany({});
        
        res.status(200).json({
            success: true,
            message: 'All students deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error deleting all students',
            error: error.message,
        });
    }
};