require('dotenv').config();

// console.log("JWT SECRET:", process.env.JWT_SECRET);

const express = require('express');
const connectDB = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const fakeStoreRouter = require('./routes/fakeStoreRouter');

const app = express();

app.use(express.json());

// ===============================
// Database
// ===============================
connectDB();

// ===============================
// Routes
// ===============================
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api/fakeStore', fakeStoreRouter);

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:");
    console.error(err);
    console.error("ERROR MESSAGE:", err.message);
    console.error("ERROR NAME:", err.name);

    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err
    });
});

// ===============================
// Server
// ===============================
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
