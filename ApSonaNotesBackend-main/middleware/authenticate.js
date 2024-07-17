


const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authenticateUser = (req, res, next) => {
  // Check if Authorization header exists and extract token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication failed. Token missing or invalid.' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from Authorization header

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = { userId: decoded.userId }; // Set user object on req with userId
    next(); // Call next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authenticateUser;

