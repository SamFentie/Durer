import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { images } from "../../constants";

const DemandsAudioWaveform = ({ uri }) => {
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);

  const onPlaybackStatusUpdate = useCallback(
    (newStatus) => {
      setStatus(newStatus);

      if (!newStatus.isLoaded || !sound) {
        return;
      }

      if (newStatus.didJustFinish) {
        sound.setPositionAsync(0);
      }
    },
    [sound]
  );

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { progressUpdateIntervalMillis: 1000 / 60 },
        onPlaybackStatusUpdate
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [uri, onPlaybackStatusUpdate]);

  const playSound = async () => {
    if (!sound) {
      return;
    }
    if (status?.isLoaded && status.isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.replayAsync();
    }
  };

  const progress = status?.isLoaded
    ? (status.positionMillis / status.durationMillis) * 100
    : 0;

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    left: `${progress}%`,
  }),[progress]);

  const samples = [
    0, 61, 69, 0, 113, 117, 113, 3, 200, 400, 15, 28, 0, 400, 116, 2, 122, 19,
    1800, 100, 50, 10, 0,
  ];

  const numLines = 20;

  // Memoize the waveform lines calculation
  const lines = useMemo(() => {
    const lines = [];
    for (let i = 0; i < numLines; i++) {
      const meteringIndex = Math.floor((i * samples.length) / numLines);
      const nextMeteringIndex = Math.ceil(
        ((i + 1) * samples.length) / numLines
      );
      const values = samples.slice(meteringIndex, nextMeteringIndex);
      const average = values.reduce((sum, a) => sum + a, 0) / values.length;
      lines.push(average);
    }
    return lines;
  }, [samples, numLines]);

  return (
    <View style={styles.container}>
      <View style={styles.playButtonContainer}>
        <TouchableOpacity onPress={playSound}>
          <View style={styles.playButton}>
            <Image
              source={images.audio}
              resizeMode="contain"
              style={styles.playButtonImage}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.waveformContainer}>
        <View style={styles.wave}>
          {lines.map((db, index) => (
            <View
              key={index}
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
                    progress > (index / numLines) * 100
                      ? "#96A0AA" // Color for played portion
                      : "#A6A746", // Color for unplayed portion
                },
              ]}
            />
          ))}
        </View>
        <Animated.View
  style={[
    styles.playbackIndicator, 
    animatedIndicatorStyle
  ]}
/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButtonContainer: {
    paddingRight: 8,
  },
  playButton: {
    width: 24,
    height: 24,
  },
  playButtonImage: {
    width: "100%",
    height: "100%",
    tintColor: "#A6A746",
  },
  waveformContainer: {
    width: 64,
    justifyContent: "center",
    alignItems: "center",
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
  playbackIndicator: {
    width: 6,
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: "#FF0000", // Color for the progress indicator
    position: "absolute",
  },
});

export default DemandsAudioWaveform;
