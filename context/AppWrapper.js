import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Stack } from "expo-router/stack";
import { loadUser } from "./slices/authSlices";

function AppWrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="opt" options={{ headerShown: false }} />
      <Stack.Screen name="setpassword" options={{ headerShown: false }} />
      <Stack.Screen name="profileOption" options={{ headerShown: false }} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="passwordResetOpt" options={{ headerShown: false }} />
      <Stack.Screen name="user/[userId]" options={{ headerShown: false }} />

      <Stack.Screen
        name="createProfileUsaCompany"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="createProfileUsRegularUser"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default AppWrapper;
