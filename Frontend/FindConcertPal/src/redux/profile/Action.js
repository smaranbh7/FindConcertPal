import api from '../../config/api';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE
} from './ActionTypes';

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    // Ensure genres is sent as a list/array
    const requestData = {
      ...profileData,
      genres: profileData.favoriteGenres // Map favoriteGenres to genres field expected by backend
    };
    const { data } = await api.put('/api/user/profile/edit', requestData);
    console.log("Profile updated:", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    dispatch({ 
      type: UPDATE_PROFILE_FAILURE, 
      payload: error.response?.data?.message || "Failed to update profile" 
    });
    throw error;
  }
};

export const uploadProfileImage = (imageFile) => async (dispatch) => {
  dispatch({ type: UPLOAD_PROFILE_IMAGE_REQUEST });
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const { data } = await api.post('/api/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log("Profile image uploaded:", data);
    dispatch({ type: UPLOAD_PROFILE_IMAGE_SUCCESS, payload: data.imageUrl });
    return data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    dispatch({ 
      type: UPLOAD_PROFILE_IMAGE_FAILURE, 
      payload: error.response?.data?.message || "Failed to upload image" 
    });
    throw error;
  }
};