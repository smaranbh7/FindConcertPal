import api from '../../config/api'
import { 
    FETCH_MY_CONCERTS_REQUEST,
    FETCH_MY_CONCERTS_SUCCESS,
    FETCH_MY_CONCERTS_FAILURE,
    DELETE_MY_CONCERTS_REQUEST,
    DELETE_MY_CONCERTS_SUCCESS
} from './ActionTypes'

export const fetchMyConcerts = () => async(dispatch) => {
    dispatch({type: FETCH_MY_CONCERTS_REQUEST});
    try {
        const { data } = await api.get("/api/concerts/matchingConcerts");
        dispatch({type: FETCH_MY_CONCERTS_SUCCESS, concerts: data});
        console.log("My concerts data:", data);
    } catch(error) {
        console.error("Error fetching my concerts:", error);
        dispatch({type: FETCH_MY_CONCERTS_FAILURE, error: error.message});
    }
}

export const deleteMyConcerts = (concertId) => async(dispatch) =>{
    dispatch({type: DELETE_MY_CONCERTS_REQUEST});
    try{
        const { data } = await api.delete("/api/concerts/"+concertId);
        dispatch({type:DELETE_MY_CONCERTS_SUCCESS, payload: concertId});
        console.log(concertId+" deleted successfully");
    }catch(error){
        console.log("Error deleting the concert "+error);
    }
}