const Notes = require("./notes.js");

const NotesService = require("./notes.service");

const notesService = new NotesService(Notes);

module.exports = notesService;
