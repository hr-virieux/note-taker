// Import Express router and the Store class
const router = require('express').Router();
const store = require('../db/store');

// Get route for retrieving all the notes
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

// Post route for creating a new note
router.post('/notes', (req, res) => {
  store
    .addNote(req.body)
    .then(note => res.json(note))
    .catch(err => res.status(500).json(err));
});

// Delete route for removing a note by its ID
router.delete('/notes/:id', (req, res) => {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
