const fs = require('fs');
import { v4 as uuidv4 } from 'uuid';
uuidv4();

class Store {
    let notes = [];

  function getNotes() {
    return notes;
    }

  function addNote(newNote) {
    notes.push(newNote);
    return newNote;
    }

  function deleteNote() {
    notes = []; // Deletes all notes (Example: Clears the notes array)
    }

  module.exports = {
  getNotes,
  addNote,
  deleteNote
  };
}