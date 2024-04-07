const fs = require('fs');
const util = require('util');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    async getNotes() {
        const data = await readFileAsync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(data);
    }

    async addNote(note) {
        const { title, text } = note;
        const newNote = { title, text, id: uuidv4() };
        const notes = await this.getNotes();
        const updatedNotes = [...notes, newNote];
        await writeFileAsync(path.join(__dirname, 'db.json'), JSON.stringify(updatedNotes));
        return newNote;
    }

    async removeNote(id) {
        const notes = await this.getNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        await writeFileAsync(path.join(__dirname, 'db.json'), JSON.stringify(filteredNotes));
        return filteredNotes;
    }
}

module.exports = new Store();
