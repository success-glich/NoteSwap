class NotesServices {
  Notes;
  constructor(Notes) {
    this.Notes = Notes;
  }
  async insertNote(note) {
    try {
      const addedNote = await new this.Notes({
        ...note,
      }).save();

      return { note: addedNote };
    } catch (err) {
      throw err;
    }
  }
  async getNotes() {
    try {
      const notes = await this.Notes.find({}).populate("category");
      // {
      //     path: "addedBy",
      //     select : "-password -__v"
      //   },

      // );
      return notes;
    } catch (err) {
      throw new Error(err);
    }
  }
  async getNote(noteId) {
    try {
      const note = await this.Notes.findOne({ _id: noteId }).populate(
        "category"
      );

      return note;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateNote(noteId, status) {
    try {
      await this.Notes.findByIdAndUpdate(noteId, {
        noteStatus: status,
      });
      return "success";
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateStatus(noteId, status) {
    try {
      await this.Notes.findByIdAndUpdate(
        {
          _id: noteId,
        },
        {
          noteStatus: status,
        }
      );
      return "success";
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = NotesServices;
