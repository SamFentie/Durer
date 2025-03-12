import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Waveform from "../audio/Waveform";
import { images } from "../../constants";
import { Audio } from "expo-av";
import RecordingWave from "../audio/RecordingWave";
import * as ImagePicker from "expo-image-picker";
import { getUserInfo } from "../../utils/user";
const WhatDoYouWant = ({ wants, hnadelWantsChange }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [wantsText, setWantsText] = React.useState("");
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();
  const [recordedUri, setRecordedUri] = React.useState();

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const userId = await getUserInfo().then((info) => info.id); // Assuming getUserInfo returns user info with an 'id' field
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const newFileName = `${currentDate}_${userId}.jpg`;
      setSelectedImage(result.assets[0].uri);
      hnadelWantsChange(
        {
          imageuri: result.assets[0].uri,
          name: newFileName,
          type: result.assets[0].type,
        },
        "imageuri"
      );
    }

    setSelectedImage({ uri: result.assets[0].uri, name: newFileName });
    console.log(result.assets);
    hnadelWantsChange(result.assets[0].uri, "imageuri");
  };

  async function startRecording() {
    if (recording) return;

    const millis = 2 * 60 * 1000;
    setTimeout(() => stopRecording(), millis);

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== "granted") return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    setRecordedUri(uri);
    const userId = await getUserInfo().then((info) => info.id); // Assuming getUserInfo returns user info with an 'id' field
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const newFileName = `${userId}_${currentDate}.m4a`;

    hnadelWantsChange(
      { uri: uri, name: newFileName, type: "audio/mpeg" },
      "audiouri"
    );
    console.log("Recording stopped and stored at", uri);
    console.log(recording);
  }

  const handlePress = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const handelCancelAudio = (e) => {
    setRecordedUri(null);
    hnadelWantsChange(e, "canclaudiouri");
  };

  const uploadAudio = async () => {
    if (!sound) return;

    const formData = new FormData();
    formData.append("audio", {
      uri: sound.getURI(),
      name: "audio.m4a",
      type: "audio/mpeg",
    });

    try {
      const response = await fetch("http://192.168.0.110:8080/uploadaudio", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Audio uploaded successfully:", data);
      } else {
        console.error("Failed to upload audio");
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };
  return (
    <View className="p-2 relative mt-7 text-white-600">
      <Text className="text-base text-gray-100 font-interr p-2">
        What do you want to buy?
      </Text>

      <View className="w-full h-32   rounded-md border-[1px]  border-white-500">
        <View className="w-full h-32 flex-row justify-start z-10 relative">
          <TextInput
            className="flex-1 font-interr px-2 text-[12px]"
            value={wants}
            placeholder="name,size,color,brand,product,service..............."
            placeholderTextColor="#7b7b8b"
            onChangeText={(e) => hnadelWantsChange(e, "text")}
          />

          <View className="flex-row items-end justify-center">
            {recordedUri && (
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                  className=" w-8 h-8 ml-2 mr-4 pl-2 pt-2"
                  onPress={() =>
                    Audio.Sound.createAsync(
                      { uri: recordedUri },
                      { shouldPlay: true }
                    )
                  }
                >
                  <Image
                    source={images.expandright}
                    className="w-4 h-4"
                    tintColor="#A6A746"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className=" w-8 h-8 mb-2 mr-4 pl-2 pt-2"
                  onPress={handelCancelAudio}
                >
                  <Text className="text-white-900 text-base font-interbbold ">
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="w-full flex-row justify-around items-center absolute bottom-2 z-20">
          <View className="h-6 w-6 z-80">
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={images.camera}
                resizeMode="contain"
                tintColor="fff"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            {selectedImage && (
              <View className="w-2 h-2">
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 20, height: 20 }}
                />
              </View>
            )}
          </View>
          <View className="w-60 h-8 flex-row items-center z-50">
            <TouchableOpacity
              onPress={handlePress}
              className={recording ? "bg-white-900" : "bg-white-400"}
            >
              <View>
                <Waveform uri={""} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WhatDoYouWant;

const styles = StyleSheet.create({});
