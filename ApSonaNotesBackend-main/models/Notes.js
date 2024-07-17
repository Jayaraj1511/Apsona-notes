// models/Note.js
const mongoose = require('mongoose');

//Model for Node
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String],
    color: String,
    labels: String,
    archived: Boolean,
    deletedAt: Boolean,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
