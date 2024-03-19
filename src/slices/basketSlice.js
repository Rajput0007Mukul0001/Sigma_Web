import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// can't jsut directly change need a dispatch

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      // action.payload me hoga product jo pass kiya ha 

      state.items = [...state.items,action.payload]
    },
    removeFromBasket: (state, action) => {
      // usi id ka remove krna hai so used js a bit
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id)

      // copy of a basket means we are changing the basket here
      let newBasket = [...state.items];

      // if not find it will return -1 there
      if(index>=0){
        // remove the basket else do nothing
        
        newBasket.splice(index,1)
        
      }
      else{
        // it won't even in happen
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it is not in the basket`
        );
      }

      // fir se re-assign
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total,item)=> total + item.price,0);


export default basketSlice.reducer;
