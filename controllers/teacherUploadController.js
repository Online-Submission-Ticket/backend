// import Teacher from '../model/teacher.model.js';

// export const uploadTeachersController = async (req, res) => {
//     try {
//         const { file: Teacherfile } = req;

//         console.log('Request file:', Teacherfile);

//         if (!Teacherfile) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'No file uploaded',
//             });
//         }

//         const results = [];
//         const lines = Teacherfile.buffer.toString('utf-8').split('\n').map(line => line.trim());

//         lines.forEach((line, index) => {
//             console.log('Processing line', index + 1, ':', line); // Add this line for logging

//             const data = line.split(',');

//             console.log('Read: ', data);

//             try {
//                 const newTeacherData = {
//                     teacherID: data[0],
//                     name: data[1],
//                     emailID: data[2],
//                     subjects: JSON.parse(data[3]),
//                     labs: JSON.parse(data[4]),
//                     CC: data[5],
//                 };
//                 console.log('Parsed data:', newTeacherData);

//                 results.push(newTeacherData);
//             } catch (error) {
//                 console.error('Error parsing JSON:', error);
//                 console.log('Error line:', line); // Add this line to log the problematic line
//             }
//         });

//         console.log('CSV reading completed. Contents: ', results);

//         try {
//             const insertedTeachers = await Teacher.insertMany(results, { maxTimeMS: 30000 });
//             console.log('Data uploaded to MongoDB successfully!', insertedTeachers);

//             res.status(201).send({
//                 success: true,
//                 message: 'Data uploaded to MongoDB successfully!',
//                 insertedTeachers,
//             });
//         } catch (error) {
//             console.error('Error uploading data to MongoDB:', error);
//             res.status(500).send({
//                 success: false,
//                 message: 'Error uploading data to MongoDB',
//                 error,
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in teacher data upload',
//             error,
//         });
//     }
// };

import csv from 'csv-parser';
import { Readable } from 'stream';
import Teacher from '../model/teacher.model.js';

export const uploadTeachersController = async (req, res) => {
    try {
        const { file: teacherFile } = req;

        console.log('Request file:', teacherFile);

        if (!teacherFile) {
            return res.status(400).send({
                success: false,
                message: 'File not found',
            });
        }

        const results = [];

        const stream = Readable.from(teacherFile.buffer.toString('utf-8'));

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
