const express = require('express');
const fakeStoreRouter = require('./routes/fakeStoreRouter'); // adjust path if needed

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // to read JSON in POST requests


// Routes
app.use('/api', fakeStoreRouter); // all fakeStore routes start with /api

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'FakeStore API Server is running 🚀' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});