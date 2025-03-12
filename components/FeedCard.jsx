import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";
import { images } from "../constants";

const FeedCard = ({ dummyFeedData }) => {
  const { width, height } = useWindowDimensions();
  const [sound, setSound] = useState();
  async function playSound(suoundata) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(suoundata);

    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  return (
    dummyFeedData && (
      <View className={` rounded-md`}>
        <Text>{dummyFeedData.text_question}</Text>
        {/* <Audio source={dummyFeedData.audio}></Audio> */}
        <Image
          source={{ uri: dummyFeedData.image }}
          resizeMode="contain"
          style={{ height: 200, width: 200 }}
        />
        <View className="h-8 w-8">
          {sound
            ? () => {
                
                sound.unloadAsync();
              }
            : undefined}

          <Button
            title="Play Sound"
            onPress={(e) => playSound({ e: dummyFeedData.voice_question })}
          />
        </View>
      </View>
    )
  );
};

export default FeedCard;

const styles = StyleSheet.create({});
