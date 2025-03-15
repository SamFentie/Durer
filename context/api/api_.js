import axios from "axios";
import { getUserInfo } from "../../utils/user";

const token = getUserInfo().then((info) => info);
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
  },
};

const basURL = "https://duer-backend-1.onrender.com";
//user
//phase one
const activateAccount = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/sendActivation`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const registerWithEmail = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/registerWithEmail`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const setPassword = async (formData) => {
  try {
    const response = await axios.post(`${basURL}/auth/setPassword`, formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logInUser = async (formData) => {
  try {
    const response = await axios.post(`${basURL}/auth/login`, formData);
    return response.data;
  } catch (error) {}
};

const registerUsanIndividualUser = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/registerIndividual`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const registerUserUsACompany = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/registerUserAsACompany`,
      formData
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const requestPasswordReset = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/requestPasswordReset`,
      formData
    );
    return response;
  } catch (error) {}
};
const confirmPasswordResetCode = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/resetPaswordCodeCheck`,
      formData
    );
    return response;
  } catch (error) {}
};

const setNewPasswordThroghCode = async (formData) => {
  try {
    const response = await axios.post(
      `${basURL}/auth/setNewPasswordThroghCheckCode`,
      formData
    );
    return response;
  } catch (error) {}
};

const rateUser = async (formData) => {
  try {
    const response = await axios.post(`${basURL}/rating`, formData);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const getUserProfile = async (userId, token) => {
    try {
      const response = await axios.get(`${basURL}/auth/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer token
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ User Profile Data:", response.data);
      return JSON.parse(response.data);
    } catch (error) {
      console.error("❌ Error fetching user profile:", error.response?.data || error.message);
      throw error;
    }
};
const getUserProfileUploadPath = async (userId, token) => {
  console.log(userId + "requested user id");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
    },
  };
  try {
    const response = await axios.get(
      `${basURL}/permitStatic/generateUploadURL/${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Function to create a new certificate
const createCertificate = async (certificateData, config) => {
  try {
    const response = await axios.post(
      `${basURL}/licenceAndCertificate/certificates`,
      certificateData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error; // Rethrow the error for further handling
  }
};

export {
  activateAccount,
  registerWithEmail,
  setPassword,
  logInUser,
  registerUsanIndividualUser,
  registerUserUsACompany,
  requestPasswordReset,
  confirmPasswordResetCode,
  setNewPasswordThroghCode,
  rateUser,
  getUserProfile,
  getUserProfileUploadPath,
  createCertificate,
};
