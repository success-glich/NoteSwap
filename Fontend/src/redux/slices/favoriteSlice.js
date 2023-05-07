import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItem: [],

  totalQuantity: 0,
};
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.favItem.find((item) => item.id === newItem.id);

      //   state.totalQuantity++;
      if (!existingItem) {
        state.favItem.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
        });
        state.totalQuantity++;
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.favItem.find((item) => item.id === id);
      if (existingItem) {
        state.favItem = state.favItem.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addItem, removeItem } = favoriteSlice.actions;

export default favoriteSlice.reducer;
