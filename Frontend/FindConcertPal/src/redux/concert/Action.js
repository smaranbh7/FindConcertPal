import api from '../../config/api'
import { 
    ADD_CONCERTS_GOING_REQUEST, 
    ADD_CONCERTS_GOING_SUCCESS, 
    ADD_CONCERTS_GOING_FAILURE,
    ADD_CONCERTS_INTERESTED_REQUEST,
    ADD_CONCERTS_INTERESTED_SUCCESS,
    ADD_CONCERTS_INTERESTED_FAILURE,
    REMOVE_CONCERT_STATUS_REQUEST,
    REMOVE_CONCERT_STATUS_SUCCESS,
    REMOVE_CONCERT_STATUS_FAILURE,
    FETCH_CONCERTS_REQUEST, 
    FETCH_CONCERTS_SUCCESS,
    FETCH_CONCERTS_FAILURE
} from './ActionTypes'


export const fetchConcerts=() => async(dispatch) =>{
    dispatch({type: FETCH_CONCERTS_REQUEST});
    try{
        const { data } = await api.get("/api/concerts")
        dispatch({type: FETCH_CONCERTS_SUCCESS, concerts:data})
        console.log(data)
    }catch(error){
        console.error("Error fetching concerts:", error)
        dispatch({type: FETCH_CONCERTS_FAILURE, error: error.message})
    }
}

export const addConcertToGoing=(concertId) => async(dispatch) =>{
    dispatch({type: ADD_CONCERTS_GOING_REQUEST});
    try{
        console.log("Making API call to:", "/api/concerts/"+concertId);
        console.log("Concert ID being sent to backend:", concertId);
        const {data} = await api.post("/api/concerts/"+concertId);
        console.log("Response from backend:", data);
        dispatch({type: ADD_CONCERTS_GOING_SUCCESS, concertId});
    }catch(error){
        console.log("Error adding concert to going", error);
        dispatch({type: ADD_CONCERTS_GOING_FAILURE, error: error.message});
    }
}

export const addConcertToInterested=(concertId) => async(dispatch) =>{
    dispatch({type: ADD_CONCERTS_INTERESTED_REQUEST});
    try{
        const {data} = await api.post("/api/concerts/"+concertId+"/interested");
        console.log(data);
        dispatch({type: ADD_CONCERTS_INTERESTED_SUCCESS, concertId});
    }catch(error){
        console.log("Error adding concert to interested", error);
        dispatch({type: ADD_CONCERTS_INTERESTED_FAILURE, error: error.message});
    }
}

export const removeConcertStatus=(concertId) => async(dispatch) =>{
    dispatch({type: REMOVE_CONCERT_STATUS_REQUEST});
    try{
        const {data} = await api.delete("/api/concerts/"+concertId+"/status");
        console.log(data);
        dispatch({type: REMOVE_CONCERT_STATUS_SUCCESS, concertId});
    }catch(error){
        console.log("Error removing concert status", error);
        dispatch({type: REMOVE_CONCERT_STATUS_FAILURE, error: error.message});
    }
}