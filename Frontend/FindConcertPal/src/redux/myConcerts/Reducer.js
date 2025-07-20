import { 
    FETCH_MY_CONCERTS_REQUEST,
    FETCH_MY_CONCERTS_SUCCESS,
    FETCH_MY_CONCERTS_FAILURE,
    UPDATE_MY_CONCERT_STATUS_REQUEST,
    UPDATE_MY_CONCERT_STATUS_SUCCESS,
    UPDATE_MY_CONCERT_STATUS_FAILURE
} from "./ActionTypes";

const initialState = {
    concerts: [],
    loading: false,
    error: null
};

export const myConcertsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MY_CONCERTS_REQUEST:
        case UPDATE_MY_CONCERT_STATUS_REQUEST:
            return {...state, loading: true, error: null};
            
        case FETCH_MY_CONCERTS_SUCCESS:
            return {...state, loading: false, concerts: action.concerts, error: null};
            
        case UPDATE_MY_CONCERT_STATUS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null,
                concerts: state.concerts.map(concert => {
                    const concertId = concert.id || concert.concertId || concert._id || concert.ID;
                    return concertId === action.concertId 
                        ? { ...concert, userStatus: action.status }
                        : concert;
                })
            };
            
        case FETCH_MY_CONCERTS_FAILURE:
        case UPDATE_MY_CONCERT_STATUS_FAILURE:
            return {...state, loading: false, error: action.error};
            
        default:
            return state;            
    }
} 