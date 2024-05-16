'use client'
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../redux/cart.slice";
import { compose } from "@reduxjs/toolkit";
import DevTools from "../containers/devtools";
const reducer={
    cart:cartReducer
}
const enhancer=compose(DevTools.instrument(),)
export const makeStore = () => {
    return configureStore({reducer,enhancer})
}
