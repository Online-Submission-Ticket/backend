import csv from 'csv-parser';
import { Readable } from 'stream';
import Teacher from '../model/teacher.model.js';

export const uploadTeachersController = async (req, res) => {
    try {
        const { file: dataFile } = req;

        console.log('Request file:', dataFile);

        if (!dataFile) {
            return res.status(400).send({
                success: false,
                message: 'File not found',
            });
        }

        const results = [];

        const stream = Readable.from(dataFile.buffer.toString('utf-8'));

        stream
            .pipe(csv())
            .on('data', (data) => {
                console.log('Read:', data);

                const newTeacherData = {
                    teacherID: data['teacherID'],
                    name: data['name'],
                    emailID: data['emailID'],
                    subjects: JSON.parse(data['subjects']),
                    labs: JSON.parse(data['labs']),
                    CC: data['CC'],
                };

                results.push(newTeacherData);
            })
            .on('end', async () => {
                console.log('CSV reading completed. Contents:', results);

                try {
                    const insertedTeachers = await Teacher.insertMany(results, { maxTimeMS: 30000 });
                    console.log('Data uploaded to MongoDB successfully!', insertedTeachers);

                    res.status(201).send({
                        success: true,
                        message: 'Data uploaded to MongoDB successfully!',
                        insertedTeachers,
                    });
                } catch (error) {
                    console.error('Error uploading data to MongoDB:', error);
                    res.status(500).send({
                        success: false,
                        message: 'Error uploading data to MongoDB',
                        error,
                    });
                }
            });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in teacher data upload',
            error,
        });
    }
};
