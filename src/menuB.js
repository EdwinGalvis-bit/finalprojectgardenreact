import { createSlice } from "@reduxjs/toolkit";
export const menuB = createSlice({
  name: "exteriors",
  initialState: [
    {
      img: "/src/assets/7.jpg",
      name: "Externas Strelitzias",
      cost: 200,
      quantity: 0,
    },
    {
      img: "/src/assets/8.jpg",
      name: "Externas Sakura",
      cost: 400,
      quantity: 0,
    },
    {
      img: "/src/assets/9.jpg",
      name: "Externas Fraxinus",
      cost: 600,
      quantity: 0,
    },
    {
      img: "/src/assets/10.jpg",
      name: "Externas Arce",
      cost: 800,
      quantity: 0,
    },
    {
      img: "/src/assets/11.jpg",
      name: "Externas Dracaena",
      cost: 600,
      quantity: 0,
    },
  ],
  reducers: {
    incrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item) {
        item.quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const item = state[action.payload];
      if (item && item.quantity > 0) {
        item.quantity--;
      }
    },
  },
});
export const { incrementAvQuantity, decrementAvQuantity } = menuB.actions;
export default menuB.reducer;
