import { configureStore } from "@reduxjs/toolkit";
import floorsReducer from "./menuA";
import treesReducer from "./menuB";
import flowerpotsReducer from "./menuC";
export default configureStore({
  reducer: {
    venue: floorsReducer,
    av: treesReducer,
    meals: flowerpotsReducer,
  },
});

