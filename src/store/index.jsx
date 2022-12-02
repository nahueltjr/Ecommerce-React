import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import loaderSlice from './slices/loader.slice'
import productsSlice from './slices/products.slice'
import purchasesSlice from './slices/purchases.slice'

export default configureStore({
    reducer: {
        Products:productsSlice,
        Loader:loaderSlice,
        Purchases:purchasesSlice,
        Cart:cartSlice,
    }
})
