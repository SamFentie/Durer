import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { images } from "../constants";
const UploadCertficatesField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  placeholderTextColor,
  otherStyles,
  ...props
}) => {
  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    if (!result.canceled) {
      const file = result.assets[0];
      const lifenceFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };
      handleChangeText(lifenceFile);
    } else {
      setTimeout(() => {
        Alert.alert("Document", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className={`space-y-2 ${otherStyles} w-full justify-center items-start`}
    >
      <Text className="text-base text-gray-100 font-interr text-white-600">
        {title}
      </Text>
      <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
        <TextInput
          className="flex-1 font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={`${
            title == "Social media links" ? "#93d1ff" : "#7b7b8b"
          }`}
          onChangeText={handleChangeText}
          required={true}
          editable={false}
        />
        {(title === "License and Certﬁcate" ||
          title === "License and Certﬁcate") && (
          <View
            onPress={() => setShowPassword(!showPassword)}
            className="flex-row items-center justify-center"
          >
            <TouchableOpacity onPress={openPicker}>
              <Image
                source={images.file}
                className="w-10 h-8 pr-4 mr-4 text-white-500 bg-white-100"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openPicker}>
              <Image source={images.camera} className="w-10 h-7" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default UploadCertficatesField;
