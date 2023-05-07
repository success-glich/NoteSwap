const notesService = require("./index");
const NotesController = {
  createNote: async (req, res) => {
    const { title, category, description, imgUrl, fileUrl } = req.body;

    //some business logic
    try {
      const { note } = await notesService.insertNote({
        title,
        category,
        description,
        imgUrl,
        fileUrl,
      });

      return res.status(201).json({
        message: "Notes created Successfully",
        note: note,
      });
    } catch (err) {
      return res.status(401).json({
        message: err.message,
      });
    }
  },
  getNotes: async (req, res) => {
    try {
      const notes = await notesService.getNotes();
      return res.status(200).json({
        message: "Notes found",
        notes,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getNote: async (req, res) => {
    const noteId = req.params.noteId;
    console.log(noteId);
    try {
      const note = await notesService.getNote(noteId);
      return res.status(200).json({
        message: "Note Found",
        note,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  updateNoteById: async (req, res) => {
    const { noteId } = req.params;
    const { status } = req.body;

    try {
      const message = await notesService.updateNote(noteId, status);
      return res.status(200).json({
        message,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  // updateStatus: async (req, res) => {
  //   const params = req.params;
  //   console.log(params);
  //   try {
  //     // const response = await notesService.updateStatus();
  //   } catch (err) {
  //     return res.status(400).json({
  //       message: err.message,
  //     });
  //   }
  // },
};
module.exports = NotesController;
