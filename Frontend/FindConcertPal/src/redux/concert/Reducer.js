import { FETCH_CONCERTS_FAILURE, FETCH_CONCERTS_REQUEST, FETCH_CONCERTS_SUCCESS } from "./ActionTypes";

const initialState ={
    concerts: [],
    loading: false,
    error: null
};


export const concertReducer = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_CONCERTS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_CONCERTS_SUCCESS:
            return {...state, loading:false, concerts:action.concerts, error: null};
        case FETCH_CONCERTS_FAILURE:
            return {...state, loading: false, error: action.error};
        default:
            return state;            
    }
}


