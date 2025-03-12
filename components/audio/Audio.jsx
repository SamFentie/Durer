import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Audio = () => {
  const [sound, setSound] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  useEffect(() => {
    if (sound) {
      sound.unloadAsync();
    }

    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: trackData[currentTrackIndex].audio_url },
        { shouldPlay: false }
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

export default Audio;

const styles = StyleSheet.create({});
