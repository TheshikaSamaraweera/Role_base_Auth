require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const mongoose = require('mongoose');

const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/files', express.static('files')); // Static file path for serving uploaded files

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Set up multer for file uploads
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage });

// Mongoose schema definition for PDF details
const pdfSchema = require("./models/pdf");

// Route for uploading PDF files
app.post('/uploadfile', upload.single('file'), async (req, res) => {
    console.log(req.file);
    const { title } = req.body; // Retrieve title from request body
    const { filename: pdfname } = req.file;

    try {
        // Create a new document with PDF details
        await pdfSchema.create({ title, pdfname });
        console.log('PDF upload successful');
        res.status(200).send({ status: 200 });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});

// Route for retrieving PDF details
app.get('/getFile', async (req, res) => {
    try {
        const data = await pdfSchema.find({});
        res.send({ status: 200, data: data });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error" });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
