import { authReducer } from "./Auth/Reducer";

const { combineReducers, legacy_createStore, applyMiddleware } = require("@reduxjs/toolkit");

const rootReducer= combineReducers({
    auth: authReducer

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));