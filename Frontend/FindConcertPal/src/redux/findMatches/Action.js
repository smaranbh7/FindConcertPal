import api from '../../config/api'
import { ACCEPT_MATCH_REQUEST_REQUEST, ACCEPT_MATCH_REQUEST_SUCCESS, GET_MATCH_REQUESTS_REQUEST, GET_MATCH_REQUESTS_SUCCESS, GET_MATCHING_USERS_REQUEST, GET_MATCHING_USERS_SUCCESS, REJECT_MATCH_REQUEST_REQUEST, REJECT_MATCH_REQUEST_SUCCESS, SEND_MATCH_REQUEST_REQUEST, SEND_MATCH_REQUEST_SUCCESS } from "./ActionTypes"

export const getMatchingUsers=()=>async(dispatch) =>{
    dispatch({type:GET_MATCHING_USERS_REQUEST});
    try{
        const { data } = await api.get("/api/match");
        console.log("Users ", data);
        dispatch({type:GET_MATCHING_USERS_SUCCESS, users: data})
    }catch(error){
        console.error("Error fetching the matching users: ", error);
    }
}


export const sendMatchRequest = (receiverId) => async(dispatch) =>{
    dispatch({type: SEND_MATCH_REQUEST_REQUEST});
    try{
        const { data } = await api.post("/api/match", receiverId);
        console.log("Match request sent to "+ receiverId);
        dispatch({type:SEND_MATCH_REQUEST_SUCCESS, payload:data})
    }catch(error){
        console.error("Error sending request to the user "+ error);
    }
}

export const getMatchRequest = ()=> async (dispatch) =>{
    dispatch({type:GET_MATCH_REQUESTS_REQUEST});
    try{
        const {data} = await api.get("api/match/receivedRequests");
        console.log("Incoming requests "+ data);
        dispatch({type:GET_MATCH_REQUESTS_SUCCESS, matchingRequests:data})
    }catch(error) {
        console.error("Error fetching conncection requests "+error);
    }
}

export const acceptMatchRequest=(userMatchId) => async (dispatch) =>{
    dispatch({type:ACCEPT_MATCH_REQUEST_REQUEST})
    try{
        const {data} = await api.post("/api/match/receivedRequests/accept", userMatchId);
        console.log(data);
        dispatch({type:ACCEPT_MATCH_REQUEST_SUCCESS, payload: userMatchId})
    }catch (error) {
        console.log("Error accepting the connection request",+ error);
    }
}

export const deleteMatchRequest = (userMatchId) => async (dispatch) =>{
    dispatch({type:REJECT_MATCH_REQUEST_REQUEST})
    try{
        const {data} = api.post("/api/match/receivedRequests/decline", userMatchId);
        dispatch({type:REJECT_MATCH_REQUEST_SUCCESS, payload: userMatchId});
    }catch(error){
        console.log("Error rejecting the request"+ error);
    }
}