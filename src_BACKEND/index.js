const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userRoutes = require('./route/route');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
