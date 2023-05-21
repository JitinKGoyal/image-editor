const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes')
const User = require('../models/user');

const postNotesValidations = [
    body('userId', 'note can not be added without userId').exists(),
    body('title', 'note must have a title').exists(),
    body('description', 'note must have a description').exists()
]

const deleteNotesValidations = [
    body('userId', 'note can not be deleted without userId').exists(),
    body('id', 'note can not be deleted without id').exists()
]

const putNotesValidations = [
    body('id', 'note can not be updated without id').exists()
]

// Endpoint to post a note.
router.post('/', postNotesValidations, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.body.userId);

    if (!user) return res.status(404).json({ error: "user does not exist" });

    Notes.create({
        user: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
    }).then(note => res.json(note));

})


// API to get all notes of a user
router.get('/:userId', async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.params.userId);

    if (!user) return res.status(404).json({ error: "user does not exist" });

    const notes = await Notes.find({ "user": req.params.userId });

    res.json(notes);

})


// API to get all notes of a user
router.put('/', putNotesValidations, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Notes.findById(req.body.id, async (err, note) => {
        if (err) {
            return res.status(404).json({ error: "note does not exist" });
        }

        note.title = req.body.title;
        note.description = req.body.description;
        note.tag = req.body.tag;

        note = await Notes.findByIdAndUpdate(req.body.id, { $set: note }, { new: true });

        res.json(note);

    });




})

// API to delete a note
router.delete('/', deleteNotesValidations, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Notes.findById(req.body.id, async (err, note) => {

        if (err) {
            return res.status(404).json({ error: "note does not exists" });
        }

        if (note.user.toString() != req.body.userId) {
            return res.status(404).json({ error: "Access denied" });
        }

        note = await Notes.findByIdAndDelete(req.body.id);

        res.json(note);
    });

})


module.exports = router;