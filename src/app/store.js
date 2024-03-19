import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// redux store that global store 
// we have a slices of information like onion has 

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
