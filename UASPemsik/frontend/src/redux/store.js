import { configureStore } from "@reduxjs/toolkit";
import { bencanaSlice } from "./dataSlice";
import { data } from "react-router-dom";


export const store = configureStore({
    reducer: {
        data: bencanaSlice.reducer
    },
    devTools: true,
});
