import { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import {
  confirmPasswordResetCode,
  setNewPasswordThroghCode,
} from "../context/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import FormField from "../components/FormField";

const PasswordResetOpt = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverMessage, setServerMessage] = useState(false);
  const [newPasswordServerError, setNewPasswordServerError] = useState(false);

  const [password, setformPassword] = useState(null);
  const [confirm_password, setConfirm_Password] = useState(null);
  const [formError, setFormError] = useState("");
  const [confirmationCode, setConfirmationCode] = useState(null);

  const router = useRouter();
  const getResetEmail = async () => {
    const email = JSON.parse(
      await AsyncStorage.getItem("password_reset_email")
    ).email;

    const userData = { email };

    return userData;
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
    const email = await getResetEmail();
    let formData = {
      activationCode,
      email,
    };
    setConfirmationCode(activationCode);
    confirmPasswordResetCode(formData).then((res) => {
      if (res.data.err) {
        setServerError(res.data.err);
      } else {
        setServerMessage(res.data.setPassword);
      }
    });
    setIsSubmitting(false);
  };

  const handelPAsswordChange = (e) => {
    setformPassword(e);
    setFormError(false);
    setServerError(false);
    setIsSubmitting(false);
  };
  const handleConfirmPasswordChnage = (e) => {
    setConfirm_Password(e);
    setFormError(false);
    setServerError(false);
    setIsSubmitting(false);
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    const email = await getResetEmail();
    const fromData = {
      email,
      password: password,
      confirm_password: confirm_password,
      activationCode: confirmationCode,
    };
    if (password !== confirm_password) {
      setFormError("Password does not match");
      return;
    }
    if (!password || !confirm_password) {
      setFormError("All fields are required!");
      return;
    }
    setIsSubmitting(true);
    setNewPasswordThroghCode(fromData).then((res) => {
      if (res.data.err) {
        setServerError(res.data.err);
        console.log("password setup error" + res.data.err);
        setIsSubmitting(false);
      } else {
        setServerMessage(res.data.message);
        console.log("password setup success" + res.data.setPassword);
        router.push("/");
        setIsSubmitting(false);
      }
    });
  };

  // useEffect(() => {
  //   console.log(state);
  // }, []);

  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          {!serverMessage && (
            <View className="mt-7 w-full">
              <Text className="text-lg font-interrbold text-white-600 text-center">
                Verify{" "}
              </Text>
              <Text className="white-200 text-center font-interr text-[12px] ">
                Please enter the code that send to your email address.
              </Text>
              {serverError && (
                <Text className="text-white-900 font-interr text-[12px] my-2 text-center">
                  {serverError}
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

              <View className="mt-7 w-full">
                <CustomButton
                  title="Verify and Proceed"
                  handelPress={submit}
                  isLoading={isSubmitting}
                  containerStsyles="w-full bg-white-500"
                />
              </View>
            </View>
          )}

          {serverMessage && (
            <View className="mt-7 w-full">
              <Text className="text-lg font-interrbold text-white-600 text-center">
                Set password
              </Text>
              <Text className="white-200 font-interr text-[12px] text-white-600 text-center my-2 ">
                Your password must be at least 8 character long.
              </Text>
              {newPasswordServerError && (
                <Text className="text-white-900 font-interr text-[12px] text-center">
                  {newPasswordServerError}
                </Text>
              )}
              {formError && (
                <Text className="text-white-900 font-interr text-[12px] text-center">
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

              <View className="mt-7 w-full">
                <CustomButton
                  title="Sign Up"
                  handelPress={submitNewPassword}
                  isLoading={isSubmitting}
                  containerStsyles="w-full bg-white-500"
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
};

export default PasswordResetOpt;

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
