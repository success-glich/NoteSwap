const NotesController = require("./notes.controller");
const { verifyUser } = require("../auth/auth.middleware");

const noteRouter = require("express").Router();

noteRouter.post("/", verifyUser, NotesController.createNote);
noteRouter.get("/", NotesController.getNotes);

// noteRouter.get("/:notesId", NotesController.getNote);
noteRouter
  .route("/:noteId")
  .get(NotesController.getNote)
  .patch(NotesController.updateNoteById);

// noteRouter.patch("/:noteId/", (req, res) => {
//   console.log(req.params);
// });
module.exports = noteRouter;
