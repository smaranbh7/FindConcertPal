const { combineReducers, legacy_createStore, applyMiddleware } = require("@reduxjs/toolkit");

const rootReducer= combineReducers({

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));