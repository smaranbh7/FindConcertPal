import api from '../../config/api'
import { 
    FETCH_MY_CONCERTS_REQUEST,
    FETCH_MY_CONCERTS_SUCCESS,
    FETCH_MY_CONCERTS_FAILURE,
    UPDATE_MY_CONCERT_STATUS_REQUEST,
    UPDATE_MY_CONCERT_STATUS_SUCCESS,
    UPDATE_MY_CONCERT_STATUS_FAILURE
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

export const updateMyConcertStatus = (concertId, status) => async(dispatch) => {
    dispatch({type: UPDATE_MY_CONCERT_STATUS_REQUEST});
    try {
        const { data } = await api.put(`/api/my-concerts/${concertId}/status`, { status });
        dispatch({type: UPDATE_MY_CONCERT_STATUS_SUCCESS, concertId, status});
        console.log("Updated concert status:", data);
    } catch(error) {
        console.error("Error updating my concert status:", error);
        dispatch({type: UPDATE_MY_CONCERT_STATUS_FAILURE, error: error.message});
    }
} 