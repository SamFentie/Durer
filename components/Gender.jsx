import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  SafeAreaView,
  Button,
} from "react-native";
import { images } from "../constants/";
const Gender = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState(true);
  const toggleCountry = () => {
    setShowPicker(!showPicker);
  };

  const handelGenderChange = (e) => {
    if (e == 0) {
      setGender(true);
      handleChangeText(true);
    } else {
      setGender(false);
      handleChangeText(false);
    }
  };

  return (
    <View
      className={`space-y-2 ${otherStyles} w-full justify-center items-start `}
    >
      <Text className="text-base font-interr  text-white-600">{title}</Text>

      <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={toggleCountry}
        >
          <Text>{gender ? "Male" : "Female"}</Text>
          <Image
            source={images.dropdown}
            resizeMode="contain"
            className="w-6 h-6 items-center justify-center mt-1"
          />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <ScrollView horizontal={true}>
          {["Male", "Female"].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={(e) => handelGenderChange(index)}
              className="text-white-500 p-2 font-bold"
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Gender;
