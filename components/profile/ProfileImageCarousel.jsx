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
  ActivityIndicator,
} from "react-native";
import { images } from "../../constants";
import React, { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getUserProfileUploadPath } from "../../context/api/api";
import { createOrUpdateUserProfile } from "../../context/api/profile";

const ProfileImageCarousel = ({
  profileImages,
  id,
  token,
  setUserProfileImages,
  profileOwnerId, // Add this prop to the component
}) => {
  const { width } = Dimensions.get("window"); // Ensure this is at the top level of the component
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(
    Array(profileImages.length).fill(true)
  );
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [uploading, setUploading] = useState(false); // Separate loading state for upload
  const [loadingProgress, setLoadingProgress] = useState({});

  const onViewRef = React.useRef((viewableItems) => {
    if (viewableItems.changed.length > 0) {
      setCurrentIndex(viewableItems.changed[0].index);
    }
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    image: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: width,
      height: (width * 3) / 4,
    },
    indicator: {
      position: "absolute",
      top: 0,
      right: 10,
      fontSize: 12,
      color: "black",
    },
  });

  const renderDotIndicators = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {profileImage&&profileImages.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              width: 16,
              height: 4,
              borderRadius: 6,
              marginHorizontal: 3,
              backgroundColor: index === currentIndex ? "#A6A746" : "#ccc",
              margin: 5,
            }}
          />
        ))}
        <Text style={styles.indicator} className="font-interr">
          {currentIndex + 1}/{profileImages.length}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={{ position: "relative" }}>
      <Image
        source={{ uri: item.path }}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() =>
          setLoadingProgress((prev) => ({ ...prev, [item.path]: 0 }))
        }
        onLoadProgress={(event) => handleImageLoadProgress(event, item.path)}
        onLoad={() =>
          setLoadingProgress((prev) => ({ ...prev, [item.path]: 100 }))
        }
        onError={() => {
          console.error(`Failed to load image: ${item.path}`);
        }}
      />
    </View>
  );

  const handelAddImage = async () => {
    setUploading(true); // Start upload loading
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
        setUploading(false);
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
      setUserProfileImages(() => [
        { id: new Date().getTime(), path: result.assets[0].uri },
        ...profileImages,
      ]);
      if (response.ok && createProfileResponse) {
        router.push("/discovery");
      }

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      // setProfileImage(result.assets[0]);
    }
    setUploading(false); // End upload loading
  };

  const isProfileOwner = id === profileOwnerId; // Replace with your logic

  return (
    <View style={styles.container}>
      {uploading ? (
        <ActivityIndicator size="large" color="#A6A746" />
      ) : (
        <>
          {renderDotIndicators()}
          {profileImages && (
            <FlatList
              data={profileImages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              pagingEnabled
              snapToInterval={width}
              decelerationRate="fast"
              onViewableItemsChanged={onViewRef.current}
              viewabilityConfig={viewabilityConfig}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </>
      )}
      <View style={{ position: "absolute", bottom: 0, right: 2 }}>
        <TouchableOpacity onPress={handelAddImage} disabled={!isProfileOwner}>
          <Image
            source={images.camera}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileImageCarousel;
