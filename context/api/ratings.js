import axios from 'axios';
import { basURL, headerConfig } from './apiConfig';

// Ratings APIs
export const createRating = async (targetId, ratingData) => {
  try {
    const response = await axios.post(
      `${basURL}/rating/${targetId}`,
      ratingData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getRatingsByTarget = async (targetId) => {
  try {
    const response = await axios.get(`${basURL}/rating/${targetId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateRating = async (ratingId, ratingData) => {
  try {
    const response = await axios.put(
      `${basURL}/rating/${ratingId}`,
      ratingData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteRating = async (ratingId) => {
  try {
    const response = await axios.delete(`${basURL}/rating/${ratingId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
