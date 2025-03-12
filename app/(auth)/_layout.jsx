import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const AuthLAyout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLAyout;
