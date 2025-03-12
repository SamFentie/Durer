import React from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { logOutAction } from "../context/slices/authSlices";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            dispatch(logOutAction()); // Clear user data
            router.replace("/"); // Redirect to sign-in page
          },
        },
      ],
      { cancelable: true }
    );
  };

  return <FontAwesome
                    name="sign-out"
                    size={25}
                    color={"#A6A746"}
                    style={{ marginRight: 15, opacity: 1}}
                    onPress={handleLogout}
                  />

};

export default LogoutButton;
