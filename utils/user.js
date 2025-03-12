import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  const user_info = JSON.parse(await AsyncStorage.getItem("user_info"));
  if (user_info) return user_info;
  if (!user_info) return null;
};
