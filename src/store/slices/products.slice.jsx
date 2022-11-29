import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const productsSlice = createSlice({
    name: 'Products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setLoader(true))
    axios.get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(()=>dispatch(setLoader(false)))
}

export const filterNameProductsThunk = (input) => dispatch => {
    dispatch(setLoader(true))
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?query=${input}`)
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(()=>dispatch(setLoader(false)))
}

export const filterCategoriesThunk = (id) => dispatch => {
    dispatch(setLoader(true))
    axios.get(`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(()=>dispatch(setLoader(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
