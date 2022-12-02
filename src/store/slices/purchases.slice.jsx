import { createSlice } from '@reduxjs/toolkit';
import { setLoader } from './loader.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const purchasesSlice = createSlice({
    name: 'Purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload
        }
    }
})

export const getPurchasesThunk = () => dispatch => {
    dispatch(setLoader(true));
    return axios
      .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
      .then((res) => dispatch(setPurchases(res.data.data.purchases)))
      .catch(err => console.log(err.response?.data))
      .finally(() => dispatch(setLoader(false)));
};

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
