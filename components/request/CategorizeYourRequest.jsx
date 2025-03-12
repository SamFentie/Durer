import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const CategorizeYourRequest = ({ need_category, hnadelNeedCategoryChange }) => {
  const [catgoryPlaceHolder, setCategoryPlaceHolder] = useState(
    <View className="flex-row items-center justify-between gap-32">
      <View>
        {["#furniture", "#retailer", "#beauty salon"].map((item) => (
          <View>
            <Text className="text-white-300">{item}</Text>
          </View>
        ))}
      </View>
      <View>
        {["#used", "#prodution", "#hypermarket"].map((item) => (
          <View>
            <Text className="text-white-300">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  const handelCategoryChnage = (e) => {
    hnadelNeedCategoryChange(e);
  };
  return (
    <View className="p-2">
      <View>
        <Text className="text-base text-gray-100 font-interr text-white-600 p-2">
          In what shop would you find the item / service?
        </Text>
      </View>

      <View className="w-full h-32   rounded-md border-[1px]  border-white-500">
        {!need_category && (
          <View className="mt-4 p-4">{catgoryPlaceHolder}</View>
        )}
        <View className="h-14 w-full absolute left-0 top-0 px-2">
          <TextInput
            multiline={true}
            numberOfLines={4}
            className="flex-1 font-interr text-[12px]"
            placeholderTextColor="#7b7b8b"
            onChangeText={handelCategoryChnage}
          />
        </View>
      </View>
    </View>
  );
};

export default CategorizeYourRequest;

const styles = StyleSheet.create({});
