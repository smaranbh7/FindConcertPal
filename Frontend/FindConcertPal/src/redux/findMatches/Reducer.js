import { act } from "react";
import { ACCEPT_MATCH_REQUEST_FAILURE, ACCEPT_MATCH_REQUEST_REQUEST, ACCEPT_MATCH_REQUEST_SUCCESS, GET_MATCH_REQUESTS_FAILURE, GET_MATCH_REQUESTS_REQUEST, GET_MATCH_REQUESTS_SUCCESS, GET_MATCHING_USERS_FAILURE, GET_MATCHING_USERS_REQUEST, GET_MATCHING_USERS_SUCCESS, REJECT_MATCH_REQUEST_FAILURE, REJECT_MATCH_REQUEST_REQUEST, REJECT_MATCH_REQUEST_SUCCESS, SEND_MATCH_REQUEST_FAILURE, SEND_MATCH_REQUEST_REQUEST, SEND_MATCH_REQUEST_SUCCESS } from "./ActionTypes";

const initialState ={
    users: [],
    incomingMatchingRequests:[],
    loading: false,
    error: null,
};


export const findMatchesReducer =(state=initialState, action ) =>{
    switch(action.type){
        case GET_MATCHING_USERS_REQUEST:
        case SEND_MATCH_REQUEST_REQUEST:
        case GET_MATCH_REQUESTS_REQUEST:
        case ACCEPT_MATCH_REQUEST_REQUEST:
        case REJECT_MATCH_REQUEST_REQUEST:
            return {...state, loading: true, error: null};
           
        case GET_MATCHING_USERS_SUCCESS:
            return {...state, loading: false, users: action.users, error: null};
        
        case SEND_MATCH_REQUEST_SUCCESS:
            return {...state, loading:false, error:null};
        
        case GET_MATCH_REQUESTS_SUCCESS:
            return {...state, loading: false, incomingMatchingRequests: action.matchingRequests, error:null};
        
        case ACCEPT_MATCH_REQUEST_SUCCESS:
            return {...state, loading: false, incomingMatchingRequests: state.incomingMatchingRequests.filter((request)=> request.id != action.payload) ,error: null};
        
        case REJECT_MATCH_REQUEST_SUCCESS:
            return {...state, loading: false, incomingMatchingRequests: state.incomingMatchingRequests.filter((request)=>request.id != action.payload) ,error: null};
        
        case GET_MATCHING_USERS_FAILURE:
        case SEND_MATCH_REQUEST_FAILURE:
        case GET_MATCH_REQUESTS_FAILURE:
        case ACCEPT_MATCH_REQUEST_FAILURE:
        case REJECT_MATCH_REQUEST_FAILURE:
            return{...state, loading: false, error: action.error };
            
        default:
            return state;    
    }
}