import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";
const initialState = {
  notes: [],
  isLoading: false,
  error: null,
  note: {},
};

export const fetchNotes = createAsyncThunk("note/fetchNotes", async () => {
  const res = await axios.get("notes");
  const data = await res?.data?.notes;
  return data;
});

export const fetchNote = createAsyncThunk("note/fetchNote", async (noteId) => {
  console.log(noteId);
  const res = await axios.get(`notes/${noteId}`);
  const data = await res.data.note;
  return data;
});

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload;
    });
    builder.addCase(fetchNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.note = action.payload;
    });
    builder.addCase(fetchNote.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default noteSlice.reducer;
