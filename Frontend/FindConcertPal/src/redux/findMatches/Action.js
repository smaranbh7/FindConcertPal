import api from '../../config/api'
import { GET_MATCHING_USERS_REQUEST, GET_MATCHING_USERS_SUCCESS, SEND_MATCH_REQUEST_REQUEST, SEND_MATCH_REQUEST_SUCCESS } from "./ActionTypes"

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