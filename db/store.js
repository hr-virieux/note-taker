// Import Node.js modules
const util = require('util');
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1'); // Import uuid to generate unique IDs

// Promisify readFile and writeFile
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

class Store {
  // Read notes from db.json
  read() {
    return readFromFile(path.join(__dirname, 'db.json'), 'utf8');
  }

  // Write notes to db.json
  write(note) {
    return writeToFile(path.join(__dirname, 'db.json'), JSON.stringify(note));
  }

  // Retrieve notes
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  // Add a new note with a unique ID, then save the note
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Fill in 'title' and 'text'");
    }
    const newNote = { title, text, id: uuidv1() };

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Remove a note by its ID
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
