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
const PhoneNumberByCountry = ({
  title,
  items,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("ethi");
  const [showPicker, setShowPicker] = useState(false);
  const [code, setCode] = useState("ET");
  const [dial_code, setDial_Code] = useState("+251");
  const toggleCountry = () => {
    setShowPicker(!showPicker);
  };

  const handelCountryPhoneChange = (item) => {
    setCode(item.code);
    setDial_Code(item.dial_code);
    setShowPicker(false);
  };

  const handlePhoneNumberChange = (e) => {
    handleChangeText(dial_code + e);
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
            <Text>{items && code}</Text>
            <Image
              source={images.dropdown}
              resizeMode="contain"
              className="w-6 h-6 items-center justify-center mt-1"
            />
            <Text>{items && `(${dial_code})`}</Text>
          </TouchableOpacity>

          <TextInput
            className="flex-1 font-semibold text-base"
            value={value.replace(dial_code, "")}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handlePhoneNumberChange}
            required={true}
            keyboardType="numeric"
            maxLength={9}
          />
        </View>
        {showPicker && items && (
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.dial_code}
                onPress={() => handelCountryPhoneChange(item)}
                className="text-white-500 p-2 font-bold"
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          ></FlatList>
        )}
      </View>
    )
  );
};

export default PhoneNumberByCountry;
