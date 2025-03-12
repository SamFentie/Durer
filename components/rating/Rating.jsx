import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Rating = ({ handleRatingValue }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const confirmRating = () => {
    handleRatingValue(rating);
    setRating(rating);
    alert(`You rated: ${rating} stars`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={star <= rating ? styles.starActive : styles.star}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={confirmRating}>
        <Text
          className="text-center tex-[12px] font-interr bg-[#fff] px-4 py-1 mt-2 rounded-md text-white-600"
          style={styles.boxShadow}
        >
          Confirm Rating
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
  },
  star: {
    fontSize: 30,
    color: "#ccc",
    marginHorizontal: 5,
  },
  starActive: {
    fontSize: 30,
    color: "#ffc107",
    marginHorizontal: 5,
  },
  confirmButton: {
    marginTop: 4,
    backgroundColor: "#A6A746",
    color: "#fff",
    padding: 2,
    borderRadius: 5,
    textAlign: "center",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.84,
    elevation: 7,
  },
});

export default Rating;
