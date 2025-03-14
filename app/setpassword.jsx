import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { registerUser, setPassword } from "../context/api/api";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { holdUserEmail } from "../context/slices/authSlices";

const SetPassword = () => {
  const retrievePhaseOneData = async () => {
    const email = JSON.parse(await AsyncStorage.getItem("otpUserData")).email;
    const user_name = JSON.parse(
      await AsyncStorage.getItem("otpUserData")
    ).user_name;

    const activationCode = JSON.parse(
      await AsyncStorage.getItem("otpUserData")
    ).activationCode;
    const userData = { email, user_name, activationCode };
    console.log("user", userData);
    return userData;
  };
  const dispatch = useDispatch();

  const [password, setformPassword] = useState(null);
  const [confirm_password, setConfirm_Password] = useState(null);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const handelPAsswordChange = (e) => {
    setformPassword(e);
    setFormError(false);
    setIsSubmitting(false);
  };
  const handleConfirmPasswordChnage = (e) => {
    setConfirm_Password(e);
    setFormError(false);
    setIsSubmitting(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const phaseoneData = await retrievePhaseOneData();
    const email = phaseoneData.email;
    const setPasswordData = {
      email,
      password: password,
      confirm_password: confirm_password,
    };
    if (!password) {
      setFormError("Password is required!");
      return;
    }
    if (!confirm_password) {
      setFormError("Please enter confirm password");
      return;
    }
    if (password !== confirm_password) {
      setFormError("Password does not match");
      return;
    }
    if (!agreeToTerms) {
      setFormError("Please agree to terms and conditions");
      return;
    }
    setIsSubmitting(true);
    setPassword(setPasswordData).then((res) => {
      if (res.error) {
        setIsSubmitting(false);
        setFormError(res.error);
        return;
      } else {
        setFormError(null);
        router.push("profileOption");
        setIsSubmitting(false);
        return;
      }
    });
  };

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] text-white-600 ">
            Set password
          </Text>
          <Text className="font-interr text-white-600 text-center">
            Your password must be at least 8 character long.
          </Text>
          {formError && (
            <Text
              className="text-white-900 font-interr mt-2"
              style={{ color: "red" }}
            >
              {formError}
            </Text>
          )}

          <FormField
            title="Password"
            placeholder="* * * * * * * *"
            value={password}
            handleChangeText={handelPAsswordChange}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <FormField
            title="Confirm password"
            placeholder="* * * * * * * *"
            value={confirm_password}
            handleChangeText={handleConfirmPasswordChnage}
            otherStyles="mt-7"
            keyboardType="password"
          />
          <View className="mt-7 w-full flex-row items-start ">
            <TouchableOpacity
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              className={
                agreeToTerms
                  ? "h-[12px] w-[13px] border-[1px] border-white-500 bg-white-500 rounded-sm"
                  : "h-[12px] w-[13px] border-[1px]  border-white-500 rounded-sm"
              }
            ></TouchableOpacity>
            <Text className="pl-2 mt-[-5px] font-interr text-white-600 text-[12px]">
              By creating an account, you agree to our{" "}
              <Link
                className="text-white-500 underline"
                href="https://www.google.com"
              >
                term of use{" "}
              </Link>
              and our{" "}
              <Link
                className="text-white-500 underline"
                href="https://www.google.com"
              >
                privacy policy
              </Link>
            </Text>
          </View>
          <View className="mt-7 w-full">
            <CustomButton
              title="Sign Up"
              handelPress={submit}
              isLoading={isSubmitting}
              containerStsyles="w-full bg-white-500"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
};

export default SetPassword;
