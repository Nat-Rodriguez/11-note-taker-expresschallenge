const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid');

// Reading and writing files using promises
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Store class to handle notes
class Store {
  // Read the content from 'db/db.json'
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  // Write the provided note to 'db/db.json'
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // Get all notes from the file
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        // Parse into an array or use an empty array if there's an error
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  // Add a new note to the file
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      // Throw an error if title or text is blank
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // Create a new note with a unique id
    const newNote = { title, text, id: uuidv1() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Remove a note with the given id from the file
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

// Export Store class
module.exports = new Store();
