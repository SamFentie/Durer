import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import { images } from "../../constants";
import ImageCaresole from "./ImageCaresole";
import PaginationIndicator from "./PaginationIndicator";
import * as ImagePicker from "expo-image-picker";
import { getUserProfileUploadPath } from "../../context/api/api";
import { createOrUpdateUserProfile } from "../../context/api/profile";

const ProfileImage = ({ profileImages, id, token }) => {
  const { width } = Dimensions.get("screen");
  const [index, setIndex] = useState(2);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [profileImage, setProfileImage] = useState(null);

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handelAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resultedImage = await fetch(result.assets[0].uri);
      const blob = await resultedImage.blob();
      const awspath = await getUserProfileUploadPath(id, token);
      if (!awspath) {
        return;
      }
      const response = await fetch(awspath.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: blob,
      });

      const userId = id;
      const filename = result.assets[0].fileName;
      const mimetype = result.assets[0].mimeType;
      const destination = awspath.uploadURL.split("?")[0];
      const path = awspath.uploadURL.split("?")[0];
      const size = result.assets[0].fileSize;

      const data = {
        filename,
        mimetype,
        destination,
        path,
        size,
        userId,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
        },
      };
      const createProfileResponse = await createOrUpdateUserProfile(
        data,
        config
      );
      console.log(
        createProfileResponse + "from profile image directly from component"
      );
      // const createProfileResponse = await axios.post(
      //   `${basURL}/permitStatic/uploadProfileImage/${userId}`,
      //   data,
      //   config
      // );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      setProfileImage(result.assets[0]);
    }
  };

  return (
    <View
      className={`w-${width} h-96  items-center flex-col justify-between bg-white-550 relative`}
    >
      {profileImages && (
        <>
          <PaginationIndicator
            data={profileImages}
            scrollX={scrollX}
            index={index}
          />
          <FlatList
            className="mt-7"
            data={profileImages}
            renderItem={({ item }) => <ImageCaresole item={item} />}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </>
      )}
      <View className="absolute bottom-0 right-2">
        <TouchableOpacity onPress={handelAddImage}>
          <Text className="text-3xl text-center text-white-100 border-2 border-white-100 rounded-full">
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
