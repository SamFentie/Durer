import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "../context/store";
import AppWrapper from "../context/AppWrapper";
SplashScreen.preventAutoHideAsync();
const RootLayout = () => {
  const [fontLoaded, error] = useFonts({
    "Inter_18pt-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter_18pt-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter_18pt-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter_18pt-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter_18pt-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Inter_18pt-ExtraBold": require("../assets/fonts/Inter_18pt-ExtraBold.ttf"),
    "Inter_18pt-ExtraLight": require("../assets/fonts/Inter_18pt-ExtraLight.ttf"),
    "Inter_18pt-Thin": require("../assets/fonts/Inter_18pt-Thin.ttf"),
    "Inter_24pt-Black": require("../assets/fonts/Inter_24pt-Black.ttf"),
    "Inter_24pt-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
    "Inter_24pt-ExtraBoldItalic": require("../assets/fonts/Inter_24pt-ExtraBoldItalic.ttf"),
    "Inter_24pt-ExtraLight": require("../assets/fonts/Inter_24pt-ExtraLight.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontLoaded) SplashScreen.hideAsync();
  }, [fontLoaded, error]);
  if (!fontLoaded && !error) return null;

  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default RootLayout;
