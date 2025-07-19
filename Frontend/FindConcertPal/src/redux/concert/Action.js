import api from '../../config/api'
import { FETCH_CONCERTS_REQUEST, FETCH_CONCERTS_SUCCESS } from './ActionTypes'


export const fetchConcerts=() => async(dispatch) =>{
    dispatch({type: FETCH_CONCERTS_REQUEST});
    try{
        const { data } = await api.get("/api/concerts")
        dispatch({type: FETCH_CONCERTS_SUCCESS, concerts:data})
        console.log(data)
    }catch(error){
        console.error("Error fetching concerts:", error)
    }
}