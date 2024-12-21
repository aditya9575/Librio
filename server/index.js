const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemon = require('nodemon');

require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});