import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { images } from "../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { activateAccount } from "../context/api/api";
import { useDispatch } from "react-redux";
import { registerUsanIndividualUser } from "../context/api/api";
import {
  logInUserAction,
  registerUserPhaseOne,
} from "../context/slices/authSlices";
import Dropdown from "../components/DropDown";
import countriy from "../context/countriy";
import DateTimePicker from "../components/DateTimePickers";
import DateTimePickers from "../components/DateTimePickers";
import PhoneNumberByCountry from "../components/PhoneNumberByCountry";
import Gender from "../components/Gender";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateProfileUsRegularUser = () => {
  const dispatch = useDispatch();
  const retrievePhaseOneData = async () => {
    const email = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).email;
    const user_name = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).user_name;
    const userData = { email, user_name };

    return userData;
  };
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [country, setCountry] = useState("Ethiopia");
  const [city, setCity] = useState("");

  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelNameChange = (e) => {
    setName(e);
    setServerError(null);
    setFormError(null);
  };
  const handelPhoneNumberChange = (e) => {
    setPhoneNumber(e);
    setServerError(null);
    setFormError(null);
  };
  const handelBioChange = (e) => {
    setBio(e);
    setServerError(null);
    setFormError(null);
  };

  const handelGenderChange = (e) => {
    setGender(e);
    setServerError(null);
    setFormError(null);
  };
  const handelCityChange = (e) => {
    setCity(e);
    setServerError(null);
    setFormError(null);
  };
  const handelDateOfBirthChange = (value) => {
    setDateOfBirth(value);
    setServerError(null);
    setFormError(null);
  };
  const handelCountryChange = (value) => {
    setCountry(value);
    setServerError(null);
    setFormError(null);
  };

  const submit = async (e) => {
    const phaseoneData = await retrievePhaseOneData();

    let email = phaseoneData.email;
    let user_name = phaseoneData.user_name;
    const fromData = {
      name,
      phoneNumber,
      bio,
      gender,
      dateOfBirth,
      country,
      city,
      isCompany: false,
      email,
      user_name,
    };

    if (!name || !phoneNumber || !dateOfBirth || !country) {
      setFormError("All fields are required!");
      // console.log(fromData);
    } else {
      setIsSubmitting(true);

      registerUsanIndividualUser(fromData).then((res) => {
        setIsSubmitting(false);
        if (res.err) {
          setServerError(res.err);
          setFormError(null);
        } else {
          logInUserAction(res.message);
          setServerError(null);
          setFormError(null);
          AsyncStorage.removeItem("user_reg_phase_one");
          router.push("/discovery");
        }
      });
    }
    // dispatch(registerUserPhaseOne(fromData));
  };

  //   useEffect(() => {
  //     setCountries(countriy);
  //   }, []);

  return (
    <SafeAreaView className="bg-white-100 h-full pb-8">
      <ScrollView>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ">
            Create profile
          </Text>
          <Image
            source={images.follow}
            resizeMode="contain"
            className="w-32 h-32 items-center justify-center mt-1"
          />
          {formError && (
            <Text className="text-white-900 font-interr mt-2">{formError}</Text>
          )}
          {serverError && (
            <Text className="text-white-900 font-interr mt-2">
              {serverError}
            </Text>
          )}

          <FormField
            title="Full name"
            placeholder="Enter your full name"
            value={name}
            handleChangeText={handelNameChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <PhoneNumberByCountry
            items={countriy && countriy}
            title="Phone number"
            placeholder="-000-00-0000"
            value={phoneNumber}
            handleChangeText={handelPhoneNumberChange}
            otherStyles="mt-7"
            keyboardType="text"
          />

          <FormField
            title="Bio"
            placeholder="Enter your bio"
            value={bio}
            handleChangeText={handelBioChange}
            otherStyles="mt-7"
            keyboardType="text"
          />

          <Gender
            title="Gender"
            placeholder="Male"
            value={gender}
            handleChangeText={handelGenderChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <DateTimePickers
            title="Birth date"
            placeholder="May 12 20000"
            value={dateOfBirth}
            handleChangeText={handelDateOfBirthChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <Dropdown
            title="Country"
            items={countriy && countriy}
            placeholder="Ethiopia"
            value={country}
            handleChangeText={handelCountryChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            title="City/Province"
            placeholder="Bole,Adiss Ababa"
            value={city}
            handleChangeText={handelCityChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          {formError && (
            <Text className="text-white-900 font-interr mt-2">{formError}</Text>
          )}
          {serverError && (
            <Text className="text-white-900 font-interr mt-2">
              {serverError}
            </Text>
          )}

          <View className="mt-7 w-full">
            <CustomButton
              title="Save"
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

export default CreateProfileUsRegularUser;
