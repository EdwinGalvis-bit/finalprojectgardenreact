import { createSlice } from "@reduxjs/toolkit";
export const menuC = createSlice({
  name: "flowerpots",
  initialState: [
    { name: "M. Jumbo", cost: 70, selected: false },
    { name: "M. Grande", cost: 65, selected: false },
    { name: "M. Mediana", cost: 50, selected: false },
    { name: "M. Pequeña", cost: 25, selected: false },
  ],
  reducers: {
    toggleMealSelection: (state, action) => {
      state[action.payload].selected = !state[action.payload].selected;
    },
  },
});
export const { toggleMealSelection } = menuC.actions;
export default menuC.reducer;
