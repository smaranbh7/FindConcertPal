import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE
} from './ActionTypes';

const initialState = {
  loading: false,
  error: null,
  uploadingImage: false,
  uploadError: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    
    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        uploadingImage: true,
        uploadError: null
      };
    
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        uploadingImage: false,
        uploadError: null
      };
    
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        uploadingImage: false,
        uploadError: action.payload
      };
    
    default:
      return state;
  }
};

export default profileReducer;