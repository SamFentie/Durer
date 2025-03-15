import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { router } from "expo-router";
//get current user
export const getLocalUser = async () => {
  try {
    const user_info = await AsyncStorage.getItem("user_info");
    return user_info ? JSON.parse(user_info) : null;
  } catch (error) {
    return null;
  }
};

//initial user state
const initialState = {
  user: false,
  error: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInUserAction: (state, action) => {
      if (AsyncStorage.getItem("user_info")) {
        AsyncStorage.removeItem("user_info");
        state.user = action.payload;
        AsyncStorage.setItem("user_info", JSON.stringify(action.payload));
      } else {
        state.user = action.payload;
        AsyncStorage.setItem("user_info", JSON.stringify(action.payload));
      }
    },
    registerUserPhaseOne: (state, action) => {
      state = action.payload;
      AsyncStorage.setItem(
        "user_reg_phase_one",
        JSON.stringify(action.payload)
      );
      AsyncStorage.getItem("user_reg_phase_one").then((temporary_userInfo) => {
        // console.log("temporary data fro reducer " + temporary_userInfo);
      });
    },
    logOutAction: (state, action) => {
      state.user = null;
      AsyncStorage.removeItem("user_info");
    },
    setUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  logInUserAction,
  logOutAction,
  setUserAction,
  registerUserPhaseOne,
} = authSlice.actions;

export default authSlice.reducer;

export const loadUser = () => async (dispatch) => {
  const user_info = await getLocalUser();
  if (user_info) {
    dispatch(setUserAction(user_info));
  }
};

export const holdPhaseOneReg = () => async (dispatch) => {
  dispatch(registerUserPhaseOne());
};
