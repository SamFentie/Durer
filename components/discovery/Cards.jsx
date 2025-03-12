// Card.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CardDemand = ({ name, category, icons }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={20} color="#556" />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.category}>{category}</Text>
      <View style={styles.iconsContainer}>
        {icons.map((icon, index) => (
          <Image key={index} source={icon} style={styles.icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  category: {
    fontSize: 14,
    color: "#777",
  },
  iconsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 8,
    tintColor: "#a3a3a3",
  },
});

export default CardDemand;
