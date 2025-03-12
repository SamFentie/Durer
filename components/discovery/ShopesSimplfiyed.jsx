import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  ScrollView,
} from "react-native";
import React from "react";
import { images } from "../../constants";
const ShopesSimplfiyed = ({ item }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Kest:" + "\n" + "https://www.yechale.com",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared With " + result.activityType);
        } else {
          console.log("Shared");
        }
      } else if ((result.action = Share.dismissedAction)) {
        console.log("dismised");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <View>
        {/* row one */}
        <View className="flex-row justify-around m-2 pl-2 my-2">
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2`}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 2).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2 `}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 3).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* row two */}
        {/* row one */}
        <View className="flex-row justify-around gap-2 pl-2 my-2">
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2`}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 2).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2 `}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 3).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* row 3 */}
        <View className="flex-row justify-around gap-2 pl-2 my-2">
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2`}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 3).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2 `}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 2).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* row 4 */}
        <View className="flex-row justify-around gap-2 pl-2 my-2">
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2`}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[3].profile_images &&
                item[3].profile_images.slice(0, 5).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* row 5 */}
        {/* row one */}
        <View className="flex-row justify-around gap-2 pl-2 my-2">
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2`}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 3).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            className={`h-[150px]  relative  rounded-lg border-2 border-white-500 px-2 `}
          >
            <View className="border-none  border-b-white-300  ">
              <View className="flex-row ">
                <View className="w-6 h-6 m-1 border-2 mt-1 ml-1 border-white-500 rounded-full">
                  <Image
                    source={images.profile}
                    resizeMode="contain"
                    tintColor="fff"
                    className="w-full h-full p-1"
                  />
                </View>
                <View className="flex-col pl-1 justify-center mt-1 pr-[26px]">
                  <Text className=" font-medium ">
                    {item[0].user.slice(0, 34)}
                  </Text>
                  <Text className="text-white-300 mt-1">
                    {item[0].shope_category.slice(0, 20)}
                  </Text>
                </View>
              </View>
              <View></View>
            </View>
            <View className="flex-row gap-2 mt-2 border-t-[1px] border-white-300">
              {item[0].profile_images &&
                item[0].profile_images.slice(0, 3).map((item) => (
                  <View className="rounded-lg border-2 border-white-500 w-14 h-11">
                    <Image
                      source={item}
                      resizeMode="contain"
                      tintColor="fff"
                      className="w-full h-full"
                    />
                  </View>
                ))}
            </View>
            <View className="flex-row items-center gap-1 pt-4 absolute right-2 bottom-2">
              <TouchableOpacity onPress={onShare} className="bg-white-400 ">
                <Image
                  source={images.share}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ShopesSimplfiyed;
