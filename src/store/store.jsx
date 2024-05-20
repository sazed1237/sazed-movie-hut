import { configureStore } from '@reduxjs/toolkit'
import movieHutReducer from './movieHutSlice'

export const store = configureStore({
    reducer: {
        movieHutData: movieHutReducer
    },
})