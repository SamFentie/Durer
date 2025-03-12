import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const DiscoveryOptions = ({
  isDemandsactive,
  isShopesActive,
  handelShopesClick,
  handelDemandesClick,
}) => {
  return (
    <View className="flex-row justify-around gap-2 my-[2px]">
      <View
        className={
          isDemandsactive
            ? "bg-white-400 border-[1px] rounded-md border-white-500 px-6 py-[0px] w-1/3"
            : "border-[1px] rounded-md border-white-500 px-6 py-[0px] w-1/3"
        }
      >
        <TouchableOpacity onPress={handelDemandesClick}>
          <Text className="text-center font-semibold py-1">Demands</Text>
        </TouchableOpacity>
      </View>
      <View
        className={
          isShopesActive
            ? "bg-white-400 border-[1px] rounded-md border-white-500 px-6 py-[0px] w-1/3"
            : "border-[1px] rounded-md border-white-500 px-6 py-[0px] w-1/3"
        }
      >
        <TouchableOpacity onPress={handelShopesClick}>
          <Text className="text-center font-semibold py-1">Shops</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiscoveryOptions;

const styles = StyleSheet.create({});
