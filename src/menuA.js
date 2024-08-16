import { createSlice } from "@reduxjs/toolkit";
export const menuA = createSlice({
  name: "planters",
  initialState: [
    {
      img: "/1.jpg",
      name: "Plantas Florales (Geranios)",
      cost: 3500,
      quantity: 0,
    },
    {
      img: "/2.jpg",
      name: "Plantas Florales (Anturios)",
      cost: 5500,
      quantity: 0,
    },
    {
      img: "/3.jpg",
      name: "Plantas Deserticas (Suculentas)",
      cost: 3700,
      quantity: 0,
    },
    {
      img: "/4.jpg",
      name: "Plantas Deserticas (Adenios)",
      cost: 5900,
      quantity: 0,
    },
    {
      img: "/5.jpg",
      name: "Plantas Carnivoras (Dionaea)",
      cost: 1100,
      quantity: 0,
    },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        if (
          state[index].name === " Plantas Florales (Anturios)" &&
          state[index].quantity >= 30
        ) {
          return;
        }
        state[index].quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});
export const { incrementQuantity, decrementQuantity } = menuA.actions;
export default menuA.reducer;
