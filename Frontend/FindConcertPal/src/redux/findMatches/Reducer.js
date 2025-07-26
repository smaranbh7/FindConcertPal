import { act } from "react";
import { GET_MATCHING_USERS_FAILURE, GET_MATCHING_USERS_REQUEST, GET_MATCHING_USERS_SUCCESS, SEND_MATCH_REQUEST_FAILURE, SEND_MATCH_REQUEST_REQUEST, SEND_MATCH_REQUEST_SUCCESS } from "./ActionTypes";

const initialState ={
    users: [],
    loading: false,
    error: null,
};


export const findMatchesReducer =(state=initialState, action ) =>{
    switch(action.type){
        case GET_MATCHING_USERS_REQUEST:
        case SEND_MATCH_REQUEST_REQUEST:
            return {...state, loading: true, error: null};
           
        case GET_MATCHING_USERS_SUCCESS:
            return {...state, loading: false, users: action.users, error: null};
        
        case SEND_MATCH_REQUEST_SUCCESS:
            return {...state, loading:false};
        
        case GET_MATCHING_USERS_FAILURE:
        case SEND_MATCH_REQUEST_FAILURE:
            return{...state, loading: false, error: action.error };
            
        default:
            return state;    
    }
}