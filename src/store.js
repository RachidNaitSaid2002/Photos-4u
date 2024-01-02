import { configureStore } from "@reduxjs/toolkit";
import Liked from "./Liked";
import Sved from "./Sved";

const store=configureStore({
    reducer: {
        favorit:Liked,
        Save:Sved
    }
})

export default store;