import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ImageTextAndAudioDemand from "./imageTextAndAudioDemand/ImageTextAndAudioDemand";
import AudioDemand from "./audioDemand/AudioDemand";
import TextDemand from "./textDemand/TextDemand";
import ImageAndTextDemand from "./imageAndTextDemand/ImageAndTextDemand";
import TextAndAudioDemand from "./textAndAudioDemand/TextAndAudioDemand";
import ImageAndAudioDemand from "./imageAndAudioDemand/ImageAndAudioDemand";
const DemandSimplifyed = ({ item }) => {
  useEffect(() => {
    console.log(item.id);
  }, []);
  if (item.text_question && item.image_question && item.voice_question) {
    return <ImageTextAndAudioDemand imageTextAudioData={item} />;
  } else if (item.text_question && item.image_question) {
    return <ImageAndTextDemand />;
  } else if (item.text_question && item.voice_question) {
    return <TextAndAudioDemand />;
  } else if (item.image_question && item.voice_question) {
    return <ImageAndAudioDemand />;
  } else if (item.text_question) {
    return <TextDemand />;
  } else {
    return <AudioDemand />;
  }
};

export default DemandSimplifyed;

const styles = StyleSheet.create({});
