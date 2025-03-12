import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import Rating from "../rating/Rating";
import RateValue from "../rating/RateValue";

const ExtrInfo = ({ userInfo }) => {
  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);

  const handleRatingValue = (rate) => {
    setRating(rate);
    setOpenRating(false);
  };

  const bio = userInfo?.bio || "";
  const maxLength = 300;

  return (
    userInfo && (
      <View className="px-4">
        <Text className="text-base font-interrbold text-white-600 my-1">
          {userInfo.first_name}
        </Text>
        {bio && (
          <Text className="font-interr text-base text-white-300 my-1 italic">
            {bio.length > maxLength ? `${bio.substring(0, maxLength)}...` : bio}
          </Text>
        )}
        {userInfo.is_company && (
          <Text className="font-interr text-white-300 text-[12px] my-1">
            {userInfo.services}
          </Text>
        )}

        <View className="flex-row justify-between">
          <View>
            <Text className="font-interr text-white-300 text-[12px] text-center">
              233
            </Text>
            <Text className="font-interr text-white-300 text-[12px] text-center">
              Following
            </Text>
            <TouchableOpacity
              className=" bg-[#fff] rounded-md  px-4"
              style={styles.boxShadow}
            >
              <Text className="text-[12px] font-interr text-center">
                Follow
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="font-interr text-white-300 text-[12px] text-center">
              233
            </Text>

            <Text className="font-interr text-white-300 text-[12px] text-center">
              Followers
            </Text>
            <TouchableOpacity
              className=" bg-[#fff] rounded-md  px-4"
              style={styles.boxShadow}
            >
              <Text className="text-[12px] font-interr text-center">Share</Text>
            </TouchableOpacity>
          </View>

          <View>
            <RateValue averageRatedValue={10} />
            <Text className="font-interr text-white-300 text-[12px] text-center">
              Rating
            </Text>
            <TouchableOpacity
              className=" bg-[#fff] rounded-md  px-4"
              style={styles.boxShadow}
              onPress={() => setOpenRating(!openRating)}
            >
              <Text className="text-[12px] font-interr text-center">Rate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {openRating && <Rating handleRatingValue={handleRatingValue} />}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 7,
  },
});
export default ExtrInfo;
