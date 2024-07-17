
const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const authenticate = require('../middleware/authenticate');
const verifytoken = require('../middleware/verifytoken');
const jwt = require('jsonwebtoken');
// // Create a new note


// POST /notes/add - Create a new note
// Middleware to verify JWT token and extract user ID
// const verifyToken = require('../middleware/verifyToken');

// Route: POST /notes
router.post('/add', verifytoken, async(req, res) => {
    console.log()
    try {
        const { title, content, tags, color, archived } = req.body;

        const newNote = new Note({
            title,
            content,
            tags,
            color,
            archived,
            userId: req.userId // Assign the extracted user ID to the note's userId field
        });

        console.log(newNote);

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
        console.log("Notes added Success");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


// Update a note
router.patch('/:id',verifytoken ,getNote, async (req, res) => {
    const id = res.note._id;
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    if (req.body.tags != null) {
        res.note.tags = req.body.tags;
    }
    if (req.body.color != null) {
        res.note.color = req.body.color;
    }
    try {
        // const updatedNote = await res.note.updatedNote();
        const updatedNote = await Note.findByIdAndUpdate(id,{title: res.note.title, content: res.note.content,tags:res.note.tags ,color:res.note.color});
        res.json(updatedNote);
        console.log("Update")
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a note
router.delete('/deletenotes/:id',verifytoken ,getNote, async (req, res) => {
    const { id } = req.params; // Extract note ID from URL params

    try {
        const deletedNote = await Note.findByIdAndDelete(id); // Find and delete note by ID

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }


        res.json({ message: 'Note deleted', deletedNote });
        console.log("delete succes");
    }  catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// routes/noteRoutes.js (continued)

// Get all notes
router.get('/getAll', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single note
router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});



// Route to fetch user notes based on userId (either logged-in user's or specified in query)
router.get('/api/user/note', verifytoken, async (req, res) => {
    
    try {
        const { userId } = req.body; // Extract userId from query parameters (e.g., /api/user/notes?userId=123)
        const userID = req.userId;
        console.log(userID);
        const notes = await Note.find({ userId: userID });

        res.status(200).json(notes);
    } catch (error) {
        console.error('Failed to fetch user notes:', error);
        res.status(500).json({ message: 'Failed to fetch user notes' });
    }
});

module.exports = router;

// Middleware function to get a single note by ID
async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Note not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.note = note;
    console.log("Has been Found");
    next();
}

module.exports = router;

