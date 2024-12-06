require('dotenv').config();
const jwtSecret = process.env.JWT;

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = decoded; 
      next(); 
    } catch (error) {
      res.status(403).json({ message: 'Invalid token.' });
    }
  };

  app.get('/api/secret', authenticateToken, (req, res) => {
    res.json({ message: 'Here is the super secret data! 🎉' });
  });
  