import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

import CustomButton from "../components/CustomButton";

const ProfileOption = () => {
  return (
    <SafeAreaView className="bg-white-100 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] text-white-600 ">
            Create profile
          </Text>
          <TouchableOpacity
            onPress={() => router.push("createProfileUsaCompany")}
          >
            <View className="mt-7 bg-white-500 flex-row justify-center items-center w-38  h-28 p-4 rounded-lg">
              <Image className="w-16 h-16 " source={images.followShop} />
              <View className="pl-2">
                <Text className="ext-lg font-interr text-base  text-white-100">
                  Create
                </Text>
                <Text className="ext-lg font-interr text-base  text-white-100 ">
                  profile as
                </Text>
                <Text className="ext-lg font-interr text-base text-white-100 ">
                  a company
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("createProfileUsRegularUser")}
          >
            <View className="mt-7 bg-white-200 flex-row justify-center items-center w-38  h-28 p-4 rounded-lg">
              <Image
                className="w-16 h-16"
                source={images.follow}
                tintColor="#fbfddd"
              />
              <View className="pl-2">
                <Text className="ext-lg font-interr text-base   text-white-100">
                  Create
                </Text>
                <Text className="ext-lg font-interr text-base  text-white-100 ">
                  profile as
                </Text>
                <Text className="ext-lg font-interr text-base  text-white-100 ">
                  an individual
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
};

export default ProfileOption;
