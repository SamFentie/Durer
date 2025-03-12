import axios from 'axios';
import { basURL, headerConfig } from './apiConfig';

// Answers APIs
export const createAnswer = async (questionId, answerData) => {
  try {
    const response = await axios.post(
      `${basURL}/answers/${questionId}`,
      answerData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAnswersByQuestion = async (questionId) => {
  try {
    const response = await axios.get(`${basURL}/answers/question/${questionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAnswer = async (answerId, answerData) => {
  try {
    const response = await axios.put(
      `${basURL}/answers/${answerId}`,
      answerData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAnswer = async (answerId) => {
  try {
    const response = await axios.delete(`${basURL}/answers/${answerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const uploadAnswerImage = async (answerId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('answerImage', imageFile);
    
    const response = await axios.post(
      `${basURL}/answers/${answerId}/image`,
      formData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
