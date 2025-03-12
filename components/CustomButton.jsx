import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, handelPress, containerStsyles, isLoading }) => {
  return (
    <TouchableOpacity
      className={`${containerStsyles}  w-full justify-center items-center rounded-lg h-[44px]  ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handelPress}
      activeOpacity={0.6}
      disabled={isLoading}
    >
      <Text className="text-white-100 font-interr text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
