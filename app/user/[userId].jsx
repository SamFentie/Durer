import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileImage from "../../components/profile/ProfileImage";
import ExtrInfo from "../../components/profile/ExtrInfo";
import CompanyDetail from "../../components/profile/CompanyDetail";
import SystemAdmin from "../../components/profile/SystemAdmin";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../utils/user";
import { icons, images } from "../../constants";
import MainDemands from "../../components/demnads/MainDemands";
import { demandData } from "../../demandsData";
import { getUserProfile } from "../../context/api/api";
import { useLocalSearchParams } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import { useRoute } from "expo-router";
import { getUserProfileData } from "../../context/api/profile";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const isFocused = useIsFocused();
  const [demands, setDemands] = useState();
  const params = useLocalSearchParams();
  const userId = params?.userId;
  console.log("Rote id:", userId);
  const { userId: userIdFromParams } = params || {}; // Retrieve userId from route
  console.log(
    userIdFromParams +
      "==================================================user id from profile"
  );
  useEffect(() => {
    setDemands(demandData);
    getUserProfileData(userId).then((res) => {
      console.log(
        "watch++++" +
          JSON.stringify(res) +
          "profile your==ssdsssss===d=ss=2sw=====s== from profile sftate"
      );
      // getUserProfile(res.id, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${res.token}`, // Replace yourTokenHere with the actual token
      //   },
      // }).then((res) => {
      //   console.log(
      //     "watch++++" +
      //       JSON.stringify(res) +
      //       "profile your==ssdsssss===d=ss=2sw=====s== from profile sftate"
      //   );
      // });
    });
    console.log(
      userId +
        "==================================================user id from profile"
    );
    getUserInfo().then((res) => {
      setUserInfo(res);
      // console.log(
      //   "watch++++" +
      //     JSON.stringify(res) +
      //     "profile your==ssdsssss===d=ss=2sw=====s== from profile sftate"
      // );
      // getUserProfile(res.id, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //     Authorization: `Bearer ${res.token}`, // Replace yourTokenHere with the actual token
      //   },
      // }).then((res) => {
      //   console.log(
      //     "watch++++" +
      //       JSON.stringify(res) +
      //       "profile your==ssdsssss===d=ss=2sw=====s== from profile sftate"
      //   );
      // });
    });
    // setUserInfo(getUserInfo);
    //
  }, [userId, isFocused]);

  const profileImages = [
    { uri: images.shope, id: 1 },
    { uri: images.shope, id: 2 },
    { uri: images.shope, id: 3 },
  ];

  return (
    <SafeAreaView className="bg-white-100 px-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileImage
          profileImages={profileImages}
          id={userInfo?.id}
          token={userInfo?.token}
        />
        <ExtrInfo userInfo={userInfo} />
        <CompanyDetail userInfo={userInfo} />
        <View className=" flex-row justify-center items-center gap-2">
          <View className="w-6 h-6 ">
            <Image
              source={icons.eyeHide}
              resizeMode="contain"
              tintColor="fff"
              className="w-full h-full"
            />
          </View>
          <View>
            <Text className="text-center font-bold">Demands</Text>
          </View>
        </View>
        {/* {demands && <MainDemands demands={demands} />} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
