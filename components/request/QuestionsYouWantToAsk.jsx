import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const QuestionsYouWantToAsk = ({ handelFurQChange }) => {
  return (
    <View className="p-2 relative">
      <Text className="text-base text-gray-100 font-interr text-white-600 p-2">
        Questions you want to ask for the shops that can provide.
      </Text>
      <View className="w-full h-48  rounded-md border-[1px]  border-white-500">
        <View className="w-full h-48 flex-col justify-around p-2">
          <TextInput
            className="flex-1 font-interr text-[12px]"
            placeholder="1# how much is the price?"
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => handelFurQChange(e, 1)}
          />
          <TextInput
            className="flex-1 font-interr text-[12px]"
            placeholder="2# do you usually rent ?"
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => handelFurQChange(e, 2)}
          />
          <TextInput
            className="flex-1 font-interr text-[12px]"
            placeholder="3# Do you give warrenty?"
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => handelFurQChange(e, 3)}
          />
          <TextInput
            className="flex-1 font-interr text-[12px]"
            placeholder="4# is your shop open on sunday?"
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => handelFurQChange(e, 4)}
          />
        </View>
      </View>
    </View>
  );
};

export default QuestionsYouWantToAsk;

const styles = StyleSheet.create({});
