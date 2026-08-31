require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

