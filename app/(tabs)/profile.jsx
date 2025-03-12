import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
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
import { getUserProfileData } from "../../context/api/profile";
import ProfileImageCarousel from "../../components/profile/ProfileImageCarousel";
import LogoutButton from "../../components/LogoutButton";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const isFocused = useIsFocused();
  const [demands, setDemands] = useState();
  const params = useLocalSearchParams();
  const userId = params?.userId;
  const [userProfileImages, setUserProfileImages] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    setDemands(demandData);

    getUserInfo().then((res) => {
      setUserInfo(res);
      setToken(res.token);
      getUserProfileData(userId, res.token).then((res) => {
        setUserProfileImages(res?.user?.ProfilePictures?res.user.ProfilePictures.reverse():images.shope);
        setUserInfo(res?.user);

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
    });
    // setUserInfo(getUserInfo);
    //
  }, [isFocused]);

  const profileImages = [
    {
      path: "https://uly-uploaded-app-resourses.s3.amazonaws.com/42175ab3c0f525805f2806d475d3bf46",
      id: 1,
    },
    {
      path: "https://uly-uploaded-app-resourses.s3.amazonaws.com/bc206ac767b2d72e44ec03d2ec220fbd",
      id: 2,
    },
  ];

  return (
    <SafeAreaView className="bg-white-100 px-2 ">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={styles.profileImage}
          className="flex-row justify-center items-center"
        >
          <ProfileImageCarousel
            profileImages={userProfileImages}
            id={userInfo?.id}
            token={userInfo?.token}
            setUserProfileImages={setUserProfileImages}
            profileOwnerId={userInfo?.id}
          />
        </View>
        <ExtrInfo userInfo={userInfo} />
        <CompanyDetail
          userInfo={userInfo}
          id={userInfo?.id}
          token={token}
          profileOwnerId={userInfo?.id}
        />
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
            <LogoutButton/>
          </View>
        </View>
        {demands && <MainDemands demands={demands} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: "#F9F9FA",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
    marginVertical: 10,
  },
  image: {
    flex: 0.8,
    width: "100%",
  },
});
