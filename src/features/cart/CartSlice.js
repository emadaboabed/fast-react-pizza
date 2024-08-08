import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cart: [],
  // {
  //   pizzaId: 12,
  //   name: "mideterranean",
  //   quantity: 2,
  //   unitPrice: 32,
  //   totalPrice: 64,
  // },
};

let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload=newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload=id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload=id
      let item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },

    decreaseItemQuantity(state, action) {
      //payload=id
      let item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export let {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export let getUsername = (state) => state.user.username;

export let getCart = (state) => state.cart.cart;

export let getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export let getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export let getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
// reselect
