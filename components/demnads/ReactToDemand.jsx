import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Share,
  Image,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";

const ReactToDemand = ({
  wehaveIt,
  weCanPrepare,
  handelWeCanPrepare,
  handelWeHaveIT,
  url,
}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Kest:" + "\n" + "https://www.yechale.com",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared With " + result.activityType);
        } else {
          console.log("Shared");
        }
      } else if ((result.action = Share.dismissedAction)) {
        console.log("dismised");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-row justify-between mt-2">
      <TouchableOpacity
        onPress={handelWeHaveIT}
        className="flex-row items-center gap-2"
      >
        <View
          className={
            wehaveIt
              ? `bg-white-500 rounded-full h-[18px] w-[18px] border-2 border-white-500`
              : `bg-white-400 rounded-full h-[18px] w-[18px] border-2 border-white-500`
          }
        ></View>
        <Text className="text-[16px] font-semibold">We have it</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handelWeCanPrepare}
        className="flex-row items-center gap-2"
      >
        <View
          className={
            weCanPrepare
              ? `bg-white-500 rounded-full h-[18px] w-[18px] border-2 border-white-500`
              : `bg-white-400 rounded-full h-[18px] w-[18px] border-2 border-white-500`
          }
        ></View>
        <Text className="text-[16px] font-semibold">We can prepare</Text>
      </TouchableOpacity>
      <View className="flex-row items-center gap-1">
        <TouchableOpacity onPress={onShare} className=" ">
          <Image
            source={images.save}
            resizeMode="contain"
            tintColor="fff"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-1">
        <TouchableOpacity onPress={onShare} className=" ">
          <Image
            source={images.share}
            resizeMode="contain"
            tintColor="fff"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReactToDemand;

const styles = StyleSheet.create({});
