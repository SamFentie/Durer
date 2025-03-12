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
import { requestPasswordReset } from "../context/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handelEmailChange = (e) => {
    setEmail(e);
    setServerError("");
    setServerMessage("");
    setIsSubmitting(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const fromData = { email };
    await requestPasswordReset(fromData).then((res) => {
      setIsSubmitting(false);
      if (res.data.err) {
        setServerError(res.data.err);
        setServerMessage(false);
      } else {
        setServerMessage(res.data.message);
        AsyncStorage.setItem("password_reset_email", JSON.stringify(fromData));
        router.push("passwordResetOpt");
        setServerError(false);
      }
    });
  };

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="text-lg font-interreb text-white-600">
            Forgot password
          </Text>
          <View>
            <Text className="white-200 text-center font-interr mx-2 text-white-600 text-[12px] mt-2">
              Please enter your email
            </Text>

            <Text className="white-200 text-center font-interr mx-2 text-white-600 text-[12px]">
              to recive a veriﬁcation code.
            </Text>
          </View>
          {serverError && (
            <Text className="text-white-900 font-interr text-[12px] mt-4 mb-[-20px]">
              {serverError}
            </Text>
          )}
          {serverMessage && (
            <Text className="text-green-500 font-interr text-[12px] mt-4 mb-[-20px]">
              {serverMessage}
            </Text>
          )}
          <View>
            <FormField
              title="Email"
              placeholder="Enter your email"
              value={email}
              handleChangeText={handelEmailChange}
              otherStyles="mt-7"
              keyboardType="email"
            />
          </View>

          <View className="w-full h-14 px-4 rounded-2xl items-center mt-7 flex-row justify-center ">
            <Pressable className="text-white-500 pl-2 font-bold">
              <Text className="text-white-500 font-interrbold">
                Try another way
              </Text>
            </Pressable>
          </View>
          <View className="mt-7 w-full">
            <CustomButton
              title="Send"
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

export default ForgotPassword;
