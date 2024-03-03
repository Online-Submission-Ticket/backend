import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
const mongoURI =  env.mongoURI;

const run = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        uploadToMongoDB();
    } catch (err) {
        console.error(err);
    }
};

const Schema = mongoose.Schema;
const studentSchema = new Schema({
    rollNo: String,
    name: String,
    attendance: Number,
    ut1Marks: Number,
    ut2Marks: Number,
});

const Student = mongoose.model('Student', studentSchema);

// Replace 'path/to/your/file.csv' with the actual path to your CSV file
const csvFilePath = 'data.csv';

// Function to read CSV file and upload data to MongoDB
const uploadToMongoDB = () => {
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
            console.log('Read:', data);

            const newData = {
                rollNo: data['Roll No'],
                name: data['Name'],
                attendance: parseFloat(data['Attendance']),
                ut1Marks: parseInt(data['UT1 Marks']),
                ut2Marks: parseInt(data['UT2 Marks']),
            };

            results.push(newData);
        })
        .on('end', () => {
            console.log('CSV reading completed. Contents:', results);

            // Save the data to MongoDB
            Student.insertMany(results, { maxTimeMS: 30000 })
                .then(() => {
                    console.log('Data uploaded to MongoDB successfully!');
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.error('Error uploading data to MongoDB:', error);
                    mongoose.connection.close();
                });
        });
};

// Execute the function
run();