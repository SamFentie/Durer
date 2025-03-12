import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ImageTextAndAudioDemand = ({ imageTextAudioData }) => {
  console.log(imageTextAudioData);
  return (
    <View>
      <Text>{imageTextAudioData.text_question}</Text>
    </View>
  );
};

export default ImageTextAndAudioDemand;

const styles = StyleSheet.create({});
