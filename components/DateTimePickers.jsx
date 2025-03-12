import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickers = ({
  title,
  placeholder,
  handleChangeText,
  otherStyles,
  value,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const confirmIOSDate = () => {
    toggleDatePicker();
    setDate(date.toDateString());
    handleChangeText(date.toDateString());
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDate(currentDate.toDateString());
        handleChangeText(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };
  return (
    <View
      className={`space-y-2 ${otherStyles} w-full justify-center items-start`}
    >
      <Text className="text-base text-gray-100 font-interr text-white-600">
        {title}
      </Text>
      <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date(value)}
            onChange={onChange}
            minimumDate={new Date("1960-01-01")}
            maximumDate={new Date()}
            style={styles.datePicker}
          />
        )}
        {showPicker && Platform.OS === "ios" && (
          <View className="flex-row items-center justify-center pl-4">
            <TouchableOpacity onPress={toggleDatePicker}>
              Cancel
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIOSDate}>
              Confirm
            </TouchableOpacity>
          </View>
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              className="flex-1 font-semibold text-base"
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#7b7b8b"
              onChangeText={handleChangeText}
              editable={false}
              onPressIn={toggleDatePicker}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default DateTimePickers;

const styles = StyleSheet.create({
  datePicker: {
    height: 120,
    marginTop: -10,
  },
});
