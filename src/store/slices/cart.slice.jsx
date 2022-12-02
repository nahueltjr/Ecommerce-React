import { createSlice } from '@reduxjs/toolkit';
import { setLoader } from './loader.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: [],
    reducers: {
        getCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
    dispatch(setLoader(true));
    axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then((res) => dispatch(getCart(res.data.data.cart.products)))
        .finally(() => dispatch(setLoader(false)));
}

export const addToCartThunk = (data) => dispatch => {
    dispatch(setLoader(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", data, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setLoader(false)));
}

export const removeProductCartThunk = (id) => dispatch => {
    dispatch(setLoader(true));
    return axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() => dispatch(setLoader(false)));
}

export const checkoutCartThunk = () => dispatch => {
    dispatch(setLoader(true));
    return axios.post("https://e-commerce-api.academlo.tech/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(getCart([])))
        .finally(() => dispatch(setLoader(false)));
}

export const { getCart } = cartSlice.actions;

export default cartSlice.reducer;
