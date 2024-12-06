const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken'); // Import JWT library

require('dotenv').config();

// Enable CORS for all origins
app.use(cors());

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Protected route
app.get('/api/secret', authenticateToken, (req, res) => {
    res.json({ message: 'Here is the super secret data! 🎉' });
});

// ... other routes and error handling

module.exports = app; // Export the app for use in other modules