import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../FormField";
import CustomButton from "../CustomButton";

const SocialMediaLinksInput = ({
  closeSocialMediaVisisbility,
  addSocialMediaLinks,
}) => {
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");

  const regexfortwitter = /^https?:\/\/twitter\.com\/([a-zA-Z0-9_]{1,15})$/;
  const regexforfacebook =
    /^https?:\/\/www\.facebook\.com\/([a-zA-Z0-9_\-\.]{1,50})$/;
  const regexfortelegram = /^https?:\/\/t\.me\/([a-zA-Z0-9_]{1,32})$/;
  const regexforinstagram =
    /^https?:\/\/www\.instagram\.com\/([a-zA-Z0-9_\-\.]{1,30})$/;
  const regexfortiktok =
    /^https?:\/\/www\.tiktok\.com\/@([a-zA-Z0-9_\-\.]{1,30})$/;

  const handleTwitterChange = (text) => {
    setTwitter(text);
  };

  const handleFacebookChange = (text) => {
    setFacebook(text);
  };

  const handleTelegramChange = (text) => {
    setTelegram(text);
  };

  const handleInstagramChange = (text) => {
    setInstagram(text);
  };

  const handleTiktokChange = (text) => {
    //const regex = /^https?:\/\/www\.tiktok\.com\/([a-zA-Z0-9_\-\.]{1,24})$/;
    //if (regex.test(text)) {
    setTiktok(text);
    //} else {
    //Alert.alert("Invalid TikTok URL", "Please enter a valid TikTok URL");
    //}
  };

  const handelLinkSubmition = () => {
    if (twitter && !regexfortwitter.test(twitter)) {
      return Alert.alert(
        "Invalid Twitter URL",
        "Please enter a valid Twitter URL formated like https://twitter.com/yourusername"
      );
    }

    if (facebook && !regexforfacebook.test(facebook)) {
      return Alert.alert(
        "Invalid Facebook URL",
        "Please enter a valid Facebook URL formated like https://www.facebook.com/yourusername"
      );
    }

    if (telegram && !regexfortelegram.test(telegram)) {
      return Alert.alert(
        "Invalid Telegram URL",
        "Please enter a valid Telegram URL formated like https://t.me/yourusername"
      );
    }

    if (instagram && !regexforinstagram.test(instagram)) {
      return Alert.alert(
        "Invalid Instagram URL",
        "Please enter a valid Instagram URL formated like https://www.instagram.com/yourusername"
      );
    }

    if (tiktok && !regexfortiktok.test(tiktok)) {
      return Alert.alert(
        "Invalid TikTok URL",
        "Please enter a valid TikTok URL formated like https://www.tiktok.com/@yourusername"
      );
    }
    if (!twitter && !facebook && !telegram && !instagram && !tiktok) {
      return Alert.alert(
        "Missing Link",
        "Please enter at least one social media link"
      );
    }
    const data = {
      twitter: twitter,
      facebook: facebook,
      telegram: telegram,
      instagram: instagram,
      tiktok: tiktok,
    };
    addSocialMediaLinks(data);
    closeSocialMediaVisisbility();
  };

  return (
    <SafeAreaView className="bg-white-100 h-full pb-8">
      <ScrollView>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ">
            Add Your Social media links
          </Text>
          <FormField
            title="Twitter"
            placeholder="https://twitter.com/username"
            value={twitter}
            handleChangeText={handleTwitterChange}
            otherStyles="mt-7"
            keyboardType="text"
            social={true}
          />

          <FormField
            title="Facebook"
            placeholder="https://www.facebook.com/username"
            value={facebook}
            handleChangeText={handleFacebookChange}
            otherStyles="mt-7"
            keyboardType="text"
            social={true}
          />

          <FormField
            title="Telegram"
            placeholder="https://t.me/username"
            value={telegram}
            handleChangeText={handleTelegramChange}
            otherStyles="mt-7"
            keyboardType="text"
            social={true}
          />

          <FormField
            title="Instagram"
            placeholder="https://www.instagram.com/username"
            value={instagram}
            handleChangeText={handleInstagramChange}
            otherStyles="mt-7"
            keyboardType="text"
            social={true}
          />

          <FormField
            title="TikTok"
            placeholder="https://www.tiktok.com/@username"
            value={tiktok}
            handleChangeText={handleTiktokChange}
            otherStyles="mt-7"
            keyboardType="text"
            social={true}
          />
          <View className="mt-7 w-full">
            <CustomButton
              title="Add"
              handelPress={handelLinkSubmition}
              containerStsyles="w-full bg-white-500"
            />
          </View>
          <View className="mt-7  mb-4w-full">
            <TouchableOpacity
              className=" bg-white-500 w-full h-[32px] px-4 rounded-lg flex-row "
              onPress={closeSocialMediaVisisbility}
            >
              <Text className="font-interr text-base mx-auto text-white-600">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SocialMediaLinksInput;
