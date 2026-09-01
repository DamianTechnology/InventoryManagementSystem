require('dotenv').config();
console.log("JWT SECRET:", process.env.JWT_SECRET);

const express = require('express');
const connectDB = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// DB
connectDB();

// Routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

