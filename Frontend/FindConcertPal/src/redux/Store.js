import { authReducer } from "./auth/Reducer"

import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk  } from "redux-thunk"
import { concertReducer } from "./concert/Reducer";
import { myConcertsReducer } from "./myConcerts/Reducer";

const rootReducer= combineReducers({
    auth: authReducer,
    concert: concertReducer,
    myConcerts: myConcertsReducer

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));