import { 
    FETCH_MY_CONCERTS_REQUEST,
    FETCH_MY_CONCERTS_SUCCESS,
    FETCH_MY_CONCERTS_FAILURE,
    DELETE_MY_CONCERTS_REQUEST,
    DELETE_MY_CONCERTS_SUCCESS
} from "./ActionTypes";

const initialState = {
    concerts: [],
    loading: false,
    error: null
};

export const myConcertsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MY_CONCERTS_REQUEST:
        case DELETE_MY_CONCERTS_REQUEST:
            return {...state, loading: true, error: null};
            
        case FETCH_MY_CONCERTS_SUCCESS:
            return {...state, loading: false, concerts: action.concerts, error: null};
        
        case DELETE_MY_CONCERTS_SUCCESS:
            return {...state, loading:false, concerts: state.concerts.filter((concert)=>concert.id !== action.payload), error: null};
            
        case FETCH_MY_CONCERTS_FAILURE:
            return {...state, loading: false, error: action.error};
            
        default:
            return state;            
    }
} 