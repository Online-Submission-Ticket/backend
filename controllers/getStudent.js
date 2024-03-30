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

        const response = {
            rollNo: student.rollNo,
            name: student.name,
            emailID: student.emailID,
            attendance: student.attendance,
            UT1Marks: student.UT1Marks,
            UT2Marks: student.UT2Marks,
            batch: student.batch,
            class: student.class,
        };

        res.status(200).json({
            success: true,
            message: 'Student details retrieved successfully',
            data: response,
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
