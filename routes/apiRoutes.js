const express = require('express');
const Store = require('../db/store');
const router = express.Router();

router.get('/notes', async (req, res) => {
    const notes = await Store.getNotes();
    res.json(notes);
});

router.post('/notes', async (req, res) => {
    const note = await Store.addNote(req.body);
    res.json(note);
});

router.delete('/notes/:id', async (req, res) => {
    await Store.removeNote(req.params.id);
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;
