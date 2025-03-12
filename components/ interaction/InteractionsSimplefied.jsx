import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { images } from "../../constants";
import IntractionsLits from "./IntractionsLits";
 
const InteractionsSimplefied = ({ item }) => {
  return (
    <View>
      <View className="bg-white-400 mt-4 rounded-md p-4 relative ">
        <View className="flex-row justify-between max-h-80 ">
          {item.image_question && (
            <View className="w-1/3 max-h-32 rounded-lg border-2 border-white-500">
              <Image
                source={item.image_question}
                resizeMode="contain"
                tintColor="fff"
                className="w-full h-full"
              />
            </View>
          )}
          <View className={item.image_question ? "w-2/3 pl-4" : "w-full"}>
            <View>
              <Text>{item.text_question}</Text>
            </View>

            <View className="flex-row">
              {item.demand_category.map((category) => (
                <View className="mx-1">
                  <Text>#{category}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text>audio</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row justify-between items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full border-2 border-white-500">
              <Image
                source={item.user_profile}
                resizeMode="contain"
                tintColor="fff"
                className="w-4 h-4"
              />
            </View>
            <View>
              <Text className="font-semibold">{item.user}</Text>
            </View>
          </View>
          <View>
            <Text className="text-[10px]">{item.createdAt}</Text>
          </View>
        </View>
        <View className=" absolute top-0 right-2 ">
          <Image
            source={images.shope}
            resizeMode="contain"
            tintColor="fff"
            className="w-6 h-6"
          />
          <View className="absolute top-[-10px] right-[2px] w-4 h-4 justify-center items-center p-[2px] bg-white-600 rounded-full">
            <Text className={item.intractions.length > 99? "text-white-500 text-[8px] font-semibold items-center ": `text-white-400 text-[8px] font-semibold items-center `}>
              {item.intractions.length > 99
                ? 99 + "+"
                : item.intractions.length}
            </Text>
          </View>
        </View>
      </View>
      {item.intractions[0]&&<IntractionsLits intractionData={item.intractions} />}
    </View>
  );
};

export default InteractionsSimplefied;

const styles = StyleSheet.create({});
