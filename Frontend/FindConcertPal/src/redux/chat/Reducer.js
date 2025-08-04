import { GET_ACCEPTED_MATCHES_FAILURE, GET_ACCEPTED_MATCHES_REQUEST, GET_ACCEPTED_MATCHES_SUCCESS } from "./ActionTypes";

const initialState = {
  acceptedMatches: [],
  loading: false,
  error: null,
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCEPTED_MATCHES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case GET_ACCEPTED_MATCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        acceptedMatches: action.payload,
        error: null,
      };
    
    case GET_ACCEPTED_MATCHES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};