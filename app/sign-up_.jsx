import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";

import { images } from "../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { activateAccount } from "../context/api/api";
import { useDispatch } from "react-redux";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

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
import {
  holdPhaseOneReg,
  registerUserPhaseOne,
} from "../context/slices/authSlices";
const SignUp = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    user_name: "",
  });
  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handelEmailChange = (e) => {
    setForm({ ...form, email: e });
    setFormError("");
    setServerError("");
    setIsSubmitting(false);
  };
  const handelUserNameChange = (e) => {
    setForm({ ...form, user_name: e });
    setFormError("");
    setServerError("");
    setIsSubmitting(false);
  };
  const submit = (e) => {
    const fromData = { email: form.email, user_name: form.user_name };
    setIsSubmitting(true);
    activateAccount(fromData).then((res) => {
      setIsSubmitting(false);
      if (res.data.err) {
        setServerError(res.data.err);
      } else {
        dispatch(registerUserPhaseOne(fromData));
        router.push("opt");
      }
    });
    //dispatch(registerUserPhaseOne(fromData));
  };

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] text-white-600 ">
            Register to create your account
          </Text>
          <Text className="font-interr text-white-600 text-base">
            Welcome! Please enter your details.
          </Text>
          {serverError && (
            <Text className="text-white-900 font-interr mt-2">
              {serverError}
            </Text>
          )}

          <FormField
            title="User name"
            placeholder="Enter your user name"
            value={form.user_name}
            handleChangeText={handelUserNameChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={handelEmailChange}
            otherStyles="mt-7"
            keyboardType="email"
          />

          <View className="mt-7 w-full">
            <CustomButton
              title="Next"
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
              Sign up with Google
            </Text>
          </TouchableOpacity>
          <View className="w-full h-14 px-4 rounded-2xl items-center mt-7 flex-row justify-center ">
            <Text className="font-interr text-[12px] text-white-600">
              Already have an account?{" "}
            </Text>
            <Text className="text-white-500 pl-[2px] font-interr">
              <Link href="/">Sign In</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
};

export default SignUp;
