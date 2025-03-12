import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";

const FurtherQ = ({ furtherQ, handleChangeText, value }) => {
  return (
    <View className="bg-white-400 mb-4 rounded-md p-4 relative flex-row items-center justify-between">
      <View className=" ">
        {furtherQ.map((item, index) => (
          <TextInput
            key={index}
            className="flex-1 font-semibold text-base"
            value={value}
            placeholder={"#" + " " + item}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
          />
        ))}
      </View>
      <View>
        <TouchableOpacity className="bg-white-500 rounded-md p-[2px] px-[6px]">
          <Text className="text-center">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FurtherQ;

const styles = StyleSheet.create({});
