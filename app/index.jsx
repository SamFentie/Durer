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
import { logInUserAction } from "../context/slices/authSlices";

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

  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");
  const [rememebrMeForThirtyDays, setRememebrMeForThirtyDays] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  // Check authentication status
  const isLoggedIn = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/discovery");
    }
  }, [isLoggedIn]);

  const handleEmailChange = (e) => {
    setForm({ ...form, email: e });
    setFormError("");
  };
  const handlePasswordChange = (e) => {
    setForm({ ...form, password: e });
    setFormError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setFormError("All fields are required!");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await logInUser(form);
      setIsSubmitting(false);
    
      if (!res.err) {
        dispatch(logInUserAction(res));
       
        router.replace("/discovery");
      } else {
        
        setFormError("Error"+res.err);
      }
    } catch (error) {
      setIsSubmitting(false);
      setFormError("An error occurred. Please try again."+error);
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
          <Text className="text-lg font-interreb text-[20px] mb-[6px] text-white-600 ">
            Log in to your account
          </Text>
          <Text className="white-200 font-interr text-base text-white-600">
            Welcome back! Please enter your details.
          </Text>

          {formError && (
            <View className="w-full flex-row justify-center items-center mt-7">
              <Text className="text-red-600 text-base font-interbel">
                {formError}
              </Text>
            </View>
          )}

          <FormField
            title="Enter your Username or Email"
            placeholder="Enter your Username or Email"
            value={form.email}
            handleChangeText={handleEmailChange}
            otherStyles="mt-7"
            keyboardType="email"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={handlePasswordChange}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <View className="w-full flex-row justify-between mt-7">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => setRememebrMeForThirtyDays(!rememebrMeForThirtyDays)}
                className={
                  rememebrMeForThirtyDays
                    ? "h-[12px] w-[13px] border-[1px] border-white-500 bg-white-500 rounded-sm"
                    : "h-[12px] w-[13px] border-[1px] border-white-500 rounded-sm"
                }
              />
              <Text className="pl-2 font-interr text-white-600 text-[12px]">
                Remember for 30 days
              </Text>
            </View>

            <Text className="text-white-500 pl-2 font-interr text-[12px]">
              <Link href="/forgotPassword"> Forgot password</Link>
            </Text>
          </View>

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
            <Text className="text-base font-interr text-white-600">
              Sign In with Google
            </Text>
          </TouchableOpacity>

          <View className="w-full h-14 px-4 rounded-2xl items-center mt-7 flex-row justify-center ">
            <Text className="font-interr text-[12px] text-white-600">
              Don’t have an account?
            </Text>
            <Text className="text-white-500 pl-[2px] font-interr text-[12px]">
              <Link href="/sign-up">Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
}
