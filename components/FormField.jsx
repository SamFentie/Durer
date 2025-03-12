import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  placeholderTextColor,
  otherStyles,
  social,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View
      className={`space-y-2 ${otherStyles} w-full justify-center items-start`}
    >
      <Text className="text-base text-white-600 font-interr">{title}</Text>
      <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
        <TextInput
          className="flex-1 font-interr text-[12px]"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={`${
            title == "Social media links" || social ? "#93d1ff" : "#7b7b8b"
          }`}
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Conﬁrm password") &&
            !showPassword
          }
          required={true}
        />
        {(title === "Password" || title === "Conﬁrm password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-4 h-4"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
