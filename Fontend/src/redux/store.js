import { configureStore } from "@reduxjs/toolkit";

import noteSlice from "./slices/noteSlice";
import favoriteSlice from "./slices/favoriteSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    note: noteSlice,
    user: userSlice,
    favorite: favoriteSlice,
  },
});

export default store;
