import axios from "axios";
import { baseURL } from "../../constants/url";

const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/profile/5`);
    setProfile(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const createOrUpdateUserProfile = async (profileData, config) => {
  try {
    const response = await axios.post(
      `${baseURL}/profilePic/createProfilePicture`,
      profileData,
      config
    );
    console.log(
      JSON.stringify(response.data) + "create or update user profile"
    );
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
};

const deleteUserProfile = async () => {
  try {
    await axios.delete(`${baseURL}/profile`);
  } catch (error) {
    console.error("Error deleting user profile:", error);
  }
};

const getUserProfileData = async (userId, token) => {
  console.log(userId + "requested user id");
  try {
    const response = await axios.get(
      `${baseURL}/auth/profile/${userId}`,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile data:", error);
  }
};
export {
  fetchUserProfile,
  createOrUpdateUserProfile,
  deleteUserProfile,
  getUserProfileData,
};
