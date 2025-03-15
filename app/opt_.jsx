import { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";

import { images } from "../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  activateAccount,
  logInUser,
  registerWithEmail,
} from "../context/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const OptVerification = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  const router = useRouter();
  const retrievePhaseOneData = async () => {
    const email = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).email;
    const user_name = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).user_name;
    const userData = { email, user_name };
    console.log("================================================================================================")
    console.log(userData)
    return userData;
  };

  const resendCode = async (e) => {
    setOtp(["", "", "", ""]);
    const formData = await retrievePhaseOneData();
    await activateAccount(formData).then((res) => {
      if (res.data.err) {
        setServerError(res.data.err);
        setServerMessage(false);
      } else {
        setServerMessage(res.data.message);
        dispatch(registerUserPhaseOne(formData));
        setServerError(false);
      }
    });
    // dispatch(registerUserPhaseOne(fromData));
  };

  let inputs = [];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move focus to the next box if the current one has a value
    if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const activationCode = otp.join("");
    const userCurrentData = await retrievePhaseOneData();
    let formData = {
      email: userCurrentData.email,
      user_name: userCurrentData.user_name,
      activationCode,
    };

    registerWithEmail(formData).then((res) => {
      if (res.data.err) {
        setServerError(res.data.err);
      } else {
        setServerMessage(res.data.message);
        router.push("setpassword");
      }
    });
    setIsSubmitting(false);
  };

  // useEffect(() => {
  //   console.log(state);
  // }, []);

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="text-lg font-interreb text-[20px] mb-[6px] text-white-600">
            Verify
          </Text>
          <Text className="text-white-600 font-interr text-base my-2 text-center">
            Please enter the 4 digit code that send to your email address.
          </Text>
          {serverError && (
            <Text className="text-white-900 font-interr text-center my-2">
              {serverError}
            </Text>
          )}
          {serverMessage && (
            <Text className="text-white-500 font-interr text-center my-2">
              {serverMessage}
            </Text>
          )}
          <View style={styles.container}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.box}
                placeholder="0"
                placeholderTextColor="#F9F9FA"
                maxLength={1}
                keyboardType="numeric"
                onChangeText={(value) => handleOtpChange(value, index)}
                value={digit}
                ref={(input) => {
                  inputs[index] = input;
                }}
              />
            ))}
          </View>

          <View className="w-full h-14 px-4 rounded-2xl items-center mt-7 flex-row justify-center ">
            <Text className="font-interr text-white-600">
              if you don’t recive code!
            </Text>
            <Pressable
              onPress={resendCode}
              className="text-white-500 pl-2 font-interr"
            >
              <Text className="text-white-500 font-interr text-base">
                Resend
              </Text>
            </Pressable>
          </View>
          <View className="mt-7 w-full">
            <CustomButton
              title="Verify and Proceed"
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

export default OptVerification;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  box: {
    borderWidth: 2,
    borderColor: "#D4D5A4",
    width: 40,
    height: 40,
    margin: 10,
    textAlign: "center",
    backgroundColor: "#D4D5A4",
    fontSize: 24,
    borderTopEndRadius: 4,
    border: "auto",
    borderRadius: 8,
  },
});
