import axios from "axios";
import { basURL } from "./apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Questions APIs
export const createQuestion = async (questionData, config) => {
  try {
    const response = await axios.post(
      `${basURL}/requests`,
      questionData,
      config
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllQuestions = async (filters = {}) => {
  try {
    const userInfo = await AsyncStorage.getItem("user_info");
    const { token } = JSON.parse(userInfo) || {};

    const response = await axios.get(`${basURL}/requests/feed`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getQuestionById = async (questionId) => {
  try {
    const response = await axios.get(`${basURL}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await axios.put(
      `${basURL}/questions/${questionId}`,
      questionData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.delete(`${basURL}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const uploadQuestionImage = async (questionId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("questionImage", imageFile);

    const response = await axios.post(
      `${basURL}/questions/${questionId}/image`,
      formData,
      headerConfig
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
