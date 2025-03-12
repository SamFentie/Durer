import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { images } from "../../constants";
const RecordingWave = ({ uri }) => {
  const [sound, setSound] = useState();
  const [status, setStatus] = useState();

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      { uri: uri },
      { progressUpdateIntervalMillis: 1000 / 60 },
      onPlaybackStatusUpdate
    );
    setSound(sound);
  }

  const onPlaybackStatusUpdate = useCallback(
    async (newStatus) => {
      setStatus(newStatus);

      if (!newStatus.isLoaded || !sound) {
        return;
      }

      if (newStatus.didJustFinish) {
        await sound?.setPositionAsync(0);
      }
    },
    [sound]
  );

  useEffect(() => {
    loadSound();
  }, [sound]);

  async function playSound() {
    if (!sound) {
      return;
    }
    if (status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.replayAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  const formatMillis = (millis) => {
    const minutes = Math.floor(millis / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded ? status.durationMillis : 1;

  const progress = position / duration;

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${progress * 100}%`,
    // withTiming(`${progress * 100}%`, {
    //   duration:
    //     (status?.isLoaded && status.progressUpdateIntervalMillis) || 100,
    // }),
  }));

  let numLines = 20;
  let lines = [];

  for (let i = 0; i < numLines; i++) {
    const meteringIndex = Math.floor((i * samples.length) / numLines);
    const nextMeteringIndex = Math.ceil(((i + 1) * samples.length) / numLines);
    const values = samples.slice(meteringIndex, nextMeteringIndex);
    const average = values.reduce((sum, a) => sum + a, 0) / values.length;
    // lines.push(memo.metering[meteringIndex]);
    lines.push(average);
  }

  return (
    <View className="flex-row justify-center items-center">
      <View className="pr-2">
        <TouchableOpacity onPress={playSound}>
          <View className="w-[24px] h-[24px]">
            <Image
              source={images.audio}
              resizeMode="contain"
              tintColor="#A6A746"
              className="w-full h-full"
            />
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-16 fle justify-center items-center">
        <View style={styles.wave}>
          {lines.map((db, index) => (
            <View
              style={[
                styles.waveLine,
                {
                  height: interpolate(
                    db,
                    [-60, 270],
                    [5, 20],
                    Extrapolation.CLAMP
                  ),
                  backgroundColor:
                    progress > index / lines.length ? "#96A0AA" : "#A6A746",
                },
              ]}
            />
          ))}
        </View>
        {/* <Animated.View
          style={[styles.playbackIndicator, animatedIndicatorStyle]}
        /> */}

        <Animated.View
          style={[styles.playbackIndicator, animatedIndicatorStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playbackContainer: {
    flex: 1,
    height: 80,
    justifyContent: "center",
  },
  playbackBackground: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackIndicator: {
    width: 6,
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: "#96A0AA",
    position: "absolute",
  },

  wave: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  waveLine: {
    flex: 1,
    height: 30,
  },
});

export default RecordingWave;

export const samples = [
  0, 61, 69, 0, 113, 117, 113, 3, 200, 400, 15, 28, 0, 400, 116, 2, 122, 19,
  1800, 100, 50, 10, 0,
];
