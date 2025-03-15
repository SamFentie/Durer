import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import "../global.css";
import { images } from "../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { logInUser } from "../context/api/api";
import { logIn } from "../context/slices/authSlices";
import Checkbox from "expo-checkbox";
// import { useFonts } from "expo-font";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

const androidClientId =
  "91420296401-06bp7q8ir48m36i35csdsv1vube7ub91.apps.googleusercontent.com";
const iosClientId =
  "91420296401-o09sf1po8q3aiea0vqsp3hc7jr0772l6.apps.googleusercontent.com";
const webClientId =
  "91420296401-fek957p5dd8pb14j9d2bes2lhkv2o369.apps.googleusercontent.com";
const config = {
  androidClientId,
  iosClientId,
  webClientId,
};
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [rememberMeForThirtyDays, setRememberMeForThirtyDays] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememebrMeForThirtyDays: rememberMeForThirtyDays ? 1 : 0,
  });
  const [formError, setFormError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(config);
  // const [fontsLoaded] = useFonts({
  //   Inter: require("../assets/fonts/Inter_18pt-Regular.ttf"),
  // });
  // Check authentication status
  const isLoggedIn = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/discovery");
    }
  }, [isLoggedIn]);

  const handleChange = (field) => (value) => {
    setForm({ ...form, [field]: value });
    setFormError("");
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email) {
      setFormError("Please enter your username or email");
      setTimeout(() => setFormError(""), 3000);
      return;
    }
    if (!form.password) {
      setFormError("Please enter your password");
      setTimeout(() => setFormError(""), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await logInUser(form);
      setIsSubmitting(false);
      console.log(res);
      if (!res.error) {
        dispatch(logIn(res));
      } else {
        setFormError(res.error);
        return;
      }
    } catch (error) {
      setIsSubmitting(false);
      setFormError("An error occurred. Please try again." + error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log("Google Auth Token:", token);
    }
  }, [response]);

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full min-h-[85vh] px-4">
          <Text className="text-[20px] font-bold mb-[6px] text-white">
            Log in to your account
          </Text>
          <Text className="white-200 font-inter text-base text-white-600">
            Welcome back! Please enter your details.
          </Text>

          <FormField
            title="Username or Email"
            placeholder="Enter your Username or Email"
            value={form.email}
            handleChangeText={handleChange("email")}
            otherStyles="mt-7"
            keyboardType="email"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={handleChange("password")}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <View className="w-full flex-row justify-between mt-7">
            <View className="flex-row items-center">
              {/* <TouchableOpacity
                onPress={() =>
                  (!rememebrMeForThirtyDays)
                }
                className={
                  rememebrMeForThirtyDays
                    ? "h-[12px] w-[13px] border-[1px] border-white-500 bg-white-500 rounded-sm"
                    : "h-[12px] w-[13px] border-[1px] border-white-500 rounded-sm"
                }
              /> */}
              <Checkbox
                value={rememberMeForThirtyDays}
                color={rememberMeForThirtyDays ? "#a6a746" : undefined}
                onValueChange={() =>
                  setRememberMeForThirtyDays(!rememberMeForThirtyDays)
                }
              />

              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 12,
                  color: "#666",
                  // fontFamily: "Inter",
                }}
              >
                Remember for 30 days
              </Text>
            </View>

            <Text
              style={{ fontSize: 16 }}
              className="text-white-500 pl-2 font-inter text-[12px]"
            >
              <Link href="/forgotPassword"> Forgot password</Link>
            </Text>
          </View>
          {formError && (
            <View className="w-full flex-row justify-center items-center mt-7">
              <Text style={{ fontSize: 15, color: "red" }}>{formError}</Text>
            </View>
          )}
          <View className="mt-7 w-full">
            <CustomButton
              title="Log In"
              handelPress={submit}
              isLoading={isSubmitting}
              containerStsyles="w-full bg-white-500"
            />
          </View>

          <TouchableOpacity
            onPress={() => promptAsync()}
            className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg items-center mt-7 flex-row justify-center"
          >
            <Image className="w-[25px] h-[25px]" source={images.googlelogo} />
            <Text className="text-base font-inter text-white-600">
              Sign In with Google
            </Text>
          </TouchableOpacity>

          <View className="w-full h-14 px-4 rounded-2xl items-center mt-7 flex-row justify-center ">
            <Text
              style={{ fontSize: 15 }}
              className="font-inter text-[12px] text-white-600"
            >
              Don’t have an account?
            </Text>
            <Text
              style={{ fontSize: 18 }}
              className="text-white-500 pl-[2px] font-inter text-[12px]"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
}
