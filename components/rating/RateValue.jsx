import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RateValue = ({ averageRatedValue }) => {
  const rating = averageRatedValue / 20; // Scale rating to 0-5
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(
        <Text key={i} style={styles.starActive}>
          {"\u2605"} {/* Full Star */}
        </Text>
      );
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      stars.push(
        <Text key={i} style={styles.halfStar}>
          {"\u2606"} {/* Half Star */}
        </Text>
      );
    } else {
      stars.push(
        <Text key={i} style={styles.star}>
          {"\u2606"} {/* Empty Star */}
        </Text>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
  },
  starActive: {
    fontSize: 14,
    color: "#ffc107", // Gold color for full stars
  },
  halfStar: {
    fontSize: 14,
    color: "#ffc107", // Gold color for half stars
  },
  star: {
    fontSize: 14,
    color: "#ccc", // Grey color for empty stars
  },
});

export default RateValue;
