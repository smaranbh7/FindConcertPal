import api from '../../config/api'
import { GET_MATCHING_USERS_REQUEST, GET_MATCHING_USERS_SUCCESS } from "./ActionTypes"

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