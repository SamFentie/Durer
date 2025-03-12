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
const Dropdown = ({
  title,
  items,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ethi");
  const [showPicker, setShowPicker] = useState(false);
  const toggleCountry = () => {
    setShowPicker(!showPicker);
  };

  const handelCountryChange = (country) => {
    handleChangeText(country);
  };

  return (
    items && (
      <View
        className={`space-y-2 ${otherStyles} w-full justify-center items-start `}
      >
        <Text className="text-base text-gray-100 font-interr  text-white-600">
          {title}
        </Text>
        <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={toggleCountry}
          >
            <Text>{value && value}</Text>
            <Image
              source={images.dropdown}
              resizeMode="contain"
              className="w-6 h-6 items-center justify-center mt-1"
            />
          </TouchableOpacity>
        </View>
        {showPicker && items && (
          <ScrollView horizontal={true}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.dial_code + item.code}
                onPress={() => handelCountryChange(item.name)}
                className="text-white-500 p-2 font-bold"
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    )
  );
};

export default Dropdown;
