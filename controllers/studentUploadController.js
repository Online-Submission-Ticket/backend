import csv from 'csv-parser';
import { Readable } from 'stream';
import Student from '../model/student.model.js';

export const uploadStudentsController = async (req, res) => {
    try {
        const { file: studentFile } = req;

        console.log('Request file:', studentFile);

        if (!studentFile) {
            return res.status(400).send({
                success: false,
                message: 'File not found',
            });
        }

        const results = [];

        const stream = Readable.from(studentFile.buffer.toString('utf-8'));

        stream
            .pipe(csv())
            .on('data', (data) => {
                console.log('Raw CSV data:', data);

                try {
                    const subjects = JSON.parse(data['subjects']);
                    const labs = JSON.parse(data['labs']);
                    console.log('Parsed subjects:', subjects);
                    console.log('Parsed labs:', labs);

                    const newStudentData = {
                        rollNo: data['rollNo'],
                        name: data['name'],
                        attendance: parseFloat(data['attendance']),
                        emailID: data['emailID'],
                        batch: data['batch'],
                        class: data['class'],
                        attendance: data['attendance'],
                        subjects,
                        labs
                    };

                    results.push(newStudentData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .on('end', async () => {
                console.log('CSV reading completed. Contents:', results);

                try {
                    const insertedStudents = await Student.insertMany(results, { maxTimeMS: 30000 });
                    console.log('Data uploaded to MongoDB successfully!', insertedStudents);

                    res.status(201).send({
                        success: true,
                        message: 'Data uploaded to MongoDB successfully!',
                        insertedStudents,
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
            message: 'Error in student data upload',
            error,
        });
    }
};
