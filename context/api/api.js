import axios from "axios";
import { getUserInfo } from "../../utils/user";

const token = getUserInfo().then((info) => info);
const config = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
  },
};

const baseURL = "https://duer-backend-1.onrender.com";
//const baseURL = "http://172.16.239.168:8000";
//user
//phase one
const activateAccount = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/sendActivation`,
      formData
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.err) {
      return { error: error.response.data.err };
    } else {
      return { error: error.message };
    }
  }
};

const registerWithEmail = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/registerWithEmail`,
      formData
    );
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.err) {
      return { error: error.response.data.err };
    } else {
      return { error: error.message };
    }
  }
};

const setPassword = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/setPassword`, formData);
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.err) {
      return { error: error.response.data.err };
    } else {
      return { error: error.message };
    }
  }
};

const logInUser = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return { error: error.response.data.error };
    } else {
      return { error: error.error };
    }
  }
};

const registerUsanIndividualUser = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/registerIndividual`,
      formData
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return { error: error.response.data.error };
    } else {
      return { error: error.error };
    }
  }
};

const registerUserUsACompany = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/registerUserAsACompany`,
      formData
    );
    return response.data;
  } catch (error) {
    return { error: "Register failed" };
  }
};
const requestPasswordReset = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/requestPasswordReset`,
      formData
    );
    return response;
  } catch (error) {
    return { error: "Password reset failed" };
  }
};
const confirmPasswordResetCode = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/resetPaswordCodeCheck`,
      formData
    );
    return response;
  } catch (error) {
    return { error: "Confirm failed" };
  }
};

const setNewPasswordThroghCode = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/auth/setNewPasswordThroghCheckCode`,
      formData
    );
    return response;
  } catch (error) {
    return { error: "Reset failed" };
  }
};

const rateUser = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/rating`, formData);
    return response;
  } catch (error) {
    return { error: "Rate failed" };
  }
};
const getUserProfile = async (userId, config) => {
  console.log(token);
  try {
    const response = await axios.get(
      `${baseURL}/auth/profile/${userId}`,
      config
    );
    console.log(response.data + "get user profile");
    return response.data;
  } catch (error) {
    console.log("Profile error:", error);
    return { error: "Profile failed" };
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
      `${baseURL}/permitStatic/generateUploadURL/${userId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log("getUserProfileUploadPath error:", error);
    return { error: "Profile Upload failed" };
  }
};

// Function to create a new certificate
const createCertificate = async (certificateData, config) => {
  try {
    const response = await axios.post(
      `${baseURL}/licenceAndCertificate/certificates`,
      certificateData,
      config
    );
    return response.data;
  } catch (error) {
    console.log("Certificate error:", error);
    return { error: "Certificate failed" };
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
