import api from "../../config/api";
import { GET_ACCEPTED_MATCHES_FAILURE, GET_ACCEPTED_MATCHES_REQUEST, GET_ACCEPTED_MATCHES_SUCCESS } from "./ActionTypes";

export const getAcceptedMatches = () => async (dispatch) => {
  dispatch({ type: GET_ACCEPTED_MATCHES_REQUEST });
  
  try {
    const token = localStorage.getItem("jwt");
    const response = await api.get("/api/match/accepted", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    dispatch({
      type: GET_ACCEPTED_MATCHES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching accepted matches:", error);
    dispatch({
      type: GET_ACCEPTED_MATCHES_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch accepted matches",
    });
  }
};