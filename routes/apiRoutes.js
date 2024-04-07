const express = require('express');
const store = require('../db/store');
const router = express.Router();

router.get('/notes', async (req, res) => {
    try {
        const notes = await store.getNotes();
        res.json(notes);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/notes', async (req, res) => {
    try {
        const note = await store.addNote(req.body);
        res.json(note);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/notes/:id', async (req, res) => {
    try {
        await store.removeNote(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
