import { StyleSheet, Animated, View, Dimensions, Text } from "react-native";
import React from "react";

const { width } = Dimensions.get("screen");

const PaginationIndicator = ({ data, scrollX, index }) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc", "#A6A746", "#ccc"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
              //   idx === index && styles.dotActive,
            ]}
          />
        );
      })}
      <View>
        <Text>
          {index + 1}/{data.length}
        </Text>
      </View>
    </View>
  );
};

export default PaginationIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    position: "absolute",
    top: 10,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  dot: {
    width: 14,
    height: 6,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: "#A6A746",
  },
});
