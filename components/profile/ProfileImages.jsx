import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import LogoutButton from "../LogoutButton";

  

const { width } = Dimensions.get("window"); // Get screen width

const ImageCarousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <View style={styles.container} >
      <View style={styles.imageContainer}>
        {/* Image Display */}
        <Image source={{ uri: images[currentIndex] }} style={styles.image}className="rounded-md" />

        {/* Image Index Display */}
        <View className="w-[100%] flex-row justify-between" style={styles.topBar}>
            <View style={styles.indexContainer} className="ml-4 flex justify-between">
                <Text style={styles.indexText}>{`${currentIndex + 1} / ${images.length}`}</Text>
            </View>
            <View style={styles.indexContainer} className="rounded-full">
                <LogoutButton/>
            </View>
            
        </View>
        {/* Navigation Buttons */}
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={prevImage}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={nextImage}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    
  },
  imageContainer: {
    position: "relative", // Allows absolute positioning of elements
    width: (width-60), // Full screen width
    height: 200,
    margin:2, // Adjust height as needed
  },
  image: {
    width: "100%", // Make image take full width
    height: "100%", // Make image take full height of container
    resizeMode: "cover", // Ensure the image covers the container
    borderRadius: 20,
  },
  button: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -15 }], // Center vertically
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 10,
    borderRadius: 5,
  },
  leftButton: {
    left: 10, // Position on the left side
  },
  rightButton: {
    right: 10, // Position on the right side
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  indexContainer: {
    
   // Center horizontally
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20, // Rounded corners
  },
  loguoutContiner:{
    backgroundColor: "rgba(255, 255, 255, 0.8)", // White background with transparency
    padding:2,
    width:10,
    height:10 
  },
  topBar:{
    position:"absolute",
    top:10
  },
  indexText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Dark text color
  },
});

export default ImageCarousel;
