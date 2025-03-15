import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { router } from "expo-router";
//initial user state
const initialState = {
  user: null,
  newUser: null,
  error: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUserAction: (state, action) => {
      state.user = action.payload;
    },
    holdOTPUserData: (state, action) => {
      state.newUser = action.payload;
    },
    logOutAction: (state, action) => {
      state.user = null;
    },
    setUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { logInUserAction, logOutAction, setUserAction, holdOTPUserData } =
  authSlice.actions;

export default authSlice.reducer;

export const loadUser = () => async (dispatch) => {
  try {
    const user_info = await AsyncStorage.getItem("user_info");
    if (user_info) {
      dispatch(setUserAction(JSON.parse(user_info)));
    }
  } catch (error) {
    console.error("Error loading user info:", error);
  }
};
export const holdUserEmail = (userData) => async (dispatch) => {
  try {
    await AsyncStorage.setItem("otpUserData", JSON.stringify(userData));
    dispatch(holdOTPUserData(userData));
  } catch (error) {
    console.error("Error saving user info:", error);
  }
};
export const logIn = (userData) => async (dispatch) => {
  try {
    await AsyncStorage.setItem("user_info", JSON.stringify(userData));
    dispatch(logInUserAction(userData));
    router.replace("/discovery");
  } catch (error) {
    console.error("Error saving user info:", error);
  }
};
export const logOutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("user_info");
    dispatch(logOutAction());
    router.replace("/"); // Redirect to sign-in page
  } catch (error) {
    console.error("Error removing user info:", error);
  }
};
