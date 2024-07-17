const jwt = require('jsonwebtoken');
const { promisify } = require('util');




const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.body);

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'your_secret_key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
  module.exports = verifyToken;