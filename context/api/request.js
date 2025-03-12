import axios from "axios";

import { getUserInfo } from "../../utils/user";
const userInfo = getUserInfo();
const token = userInfo.token;
// const config = {
//   headers: {
//     "content-type": "multipart/form-data",
//     Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
//   },
// };

const basURL = "http://192.168.100.101:6666";
export const createRequest = async (data, config) => {
  console.log(
    "==============================================================data" +
      JSON.stringify(config) +
      "data"
  );

  try {
    const response = await axios.post(`${basURL}/requests`, data, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRequests = async () => {
  try {
    const response = await axios.get(`${basURL}/requests`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRequestById = async (id) => {
  try {
    const response = await axios.get(`${basURL}/requests/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateRequestById = async (id, data) => {
  try {
    const response = await axios.put(`${basURL}/requests/${id}`, data, config);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteRequestById = async (id) => {
  try {
    const response = await axios.delete(`${basURL}/requests/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
