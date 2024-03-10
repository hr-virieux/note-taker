const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Helper function to read the JSON file
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const saveNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 4), 'utf8');
};

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Routes
// GET Request for all notes
app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST Request for saving a new note
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = { title, text, id: uuidv4() };

  const notes = readNotes();
  notes.push(newNote);
  saveNotes(notes);

  res.json(newNote);
});

// DELETE Request for a specific note
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  let notes = readNotes();

  notes = notes.filter(note => note.id !== id);
  saveNotes(notes);

  res.json({ message: 'Note has been deleted successfully' });
});

// Redirects to the home page for any other route not defined
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Set the server to listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
