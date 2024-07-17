const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// Route: POST /auth/register

router.post('/register',  async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/getUser', async (req, res)=> {
    try{
        const user =  await User.find();
        res.json(user);
        console.log("User has been find");

    }catch (error){
        res.status(400).json({message: error.message});
    }
})

router.get('/:userId', async (req, res) => {
    const userId = req.user.userId; // Extract user ID from authenticated request
    try {
      const notes = await Note.find({ userId });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user notes' });
    }
  });
  

// Route: POST /auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        
        // const users = User.save(token);
        res.status(200).json({user:user, token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
