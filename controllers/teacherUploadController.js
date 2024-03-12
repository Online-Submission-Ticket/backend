import Teacher from '../model/teacher.model.js';

export const uploadTeachersController = async (req, res) => {
    try {
        const { Teacherfile } = req.files || {}; // 'Teacherfile' should match the field name used in the frontend

        console.log('Request files:', req);

        if (!Teacherfile) {
            return res.status(400).send({
                success: false,
                message: 'No file uploaded',
            });
        }

        const results = [];
        const lines = Teacherfile.data.toString('utf-8').split('\n'); // 'Teacherfile' instead of 'file'

        lines.forEach((line) => {
            // Parse the line data
            const data = line.split(',');

            console.log('Read: ', data);

            const newTeacherData = {
                teacherID: data[0], // 0 means that row
                name: data[1],
                emailID: data[2],
                subjects: JSON.parse(data[3]),
                labs: JSON.parse(data[4]),
                CC: data[5],
            };

            results.push(newTeacherData);
        });

        console.log('CSV reading completed. Contents: ', results);

        try {
            // Save the data to MongoDB
            const insertedTeachers = await Teacher.insertMany(results, { maxTimeMS: 30000 });
            console.log('Data uploaded to MongoDB successfully!', insertedTeachers);

            res.status(200).send({
                success: true,
                message: 'Data uploaded to MongoDB successfully!',
                insertedTeachers,
            });
        } catch (error) {
            if (error.code === 11000) {
                // Handle duplicate key error (MongoError)
                console.error('Duplicate key error:', error);
                const duplicateTeacherID = error.keyValue.teacherID; // Extracts the duplicate teacherID
                res.status(400).send({
                    success: false,
                    message: `Duplicate key error. TeacherID '${duplicateTeacherID}' is already in use.`,
                    error,
                });
            } else {
                // Handle other errors
                console.error('Error uploading data to MongoDB:', error);
                res.status(500).send({
                    success: false,
                    message: 'Error uploading data to MongoDB',
                    error,
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in teacher data upload',
            error,
        });
    }
};
