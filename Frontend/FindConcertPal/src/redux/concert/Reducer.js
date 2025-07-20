
import { 
    ADD_CONCERTS_GOING_FAILURE, 
    ADD_CONCERTS_GOING_REQUEST, 
    ADD_CONCERTS_GOING_SUCCESS,
    ADD_CONCERTS_INTERESTED_FAILURE,
    ADD_CONCERTS_INTERESTED_REQUEST,
    ADD_CONCERTS_INTERESTED_SUCCESS,
    REMOVE_CONCERT_STATUS_FAILURE,
    REMOVE_CONCERT_STATUS_REQUEST,
    REMOVE_CONCERT_STATUS_SUCCESS,
    FETCH_CONCERTS_FAILURE, 
    FETCH_CONCERTS_REQUEST, 
    FETCH_CONCERTS_SUCCESS 
} from "./ActionTypes";

const initialState ={
    concerts: [],
    loading: false,
    error: null
};


export const concertReducer = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_CONCERTS_REQUEST:
        case ADD_CONCERTS_GOING_REQUEST:
        case ADD_CONCERTS_INTERESTED_REQUEST:
        case REMOVE_CONCERT_STATUS_REQUEST:
            return {...state, loading: true, error: null};

        case ADD_CONCERTS_GOING_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null,
                concerts: state.concerts.map(concert => {
                    const concertId = concert.id || concert.concertId || concert._id || concert.ID;
                    return concertId === action.concertId 
                        ? { ...concert, userStatus: 'going' }
                        : concert;
                })
            };

        case FETCH_CONCERTS_SUCCESS:
            return {...state, loading:false, concerts:action.concerts, error: null};

        case ADD_CONCERTS_INTERESTED_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null,
                concerts: state.concerts.map(concert => {
                    const concertId = concert.id || concert.concertId || concert._id || concert.ID;
                    return concertId === action.concertId 
                        ? { ...concert, userStatus: 'interested' }
                        : concert;
                })
            };
            
        case REMOVE_CONCERT_STATUS_SUCCESS:
            return {
                ...state, 
                loading: false, 
                error: null,
                concerts: state.concerts.map(concert => {
                    const concertId = concert.id || concert.concertId || concert._id || concert.ID;
                    return concertId === action.concertId 
                        ? { ...concert, userStatus: null }
                        : concert;
                })
            };

        case FETCH_CONCERTS_FAILURE:
        case ADD_CONCERTS_GOING_FAILURE:
        case ADD_CONCERTS_INTERESTED_FAILURE:
        case REMOVE_CONCERT_STATUS_FAILURE:
            return {...state, loading: false, error: action.error};
            
        default:
            return state;            
    }
}


