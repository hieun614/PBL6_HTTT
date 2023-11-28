import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:3000/product/${id}/`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      data,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { item },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
