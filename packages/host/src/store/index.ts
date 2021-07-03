import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import hostReducer from "./reducer";

// const store = createStore(
//     combineReducers({
//         host: hostReducer
//     }));

export const store = configureStore({
    reducer: combineReducers({
        host: hostReducer
    }),
    devTools: {
        name: 'Micro-Frontend',
        maxAge: 50,
    }
});


export default store;
