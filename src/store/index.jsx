import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from './slices/loader.slice'
import productsSlice from './slices/products.slice'

export default configureStore({
    reducer: {
        Products:productsSlice,
        Loader:loaderSlice,
        
    }
})
