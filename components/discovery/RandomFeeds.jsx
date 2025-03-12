import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import FeedCard from "../FeedCard";
import { dummyFeedData } from "../../constants/dumyfeedData";
import DescoveryDemand from "../demnads/DEscoveryDemand";
const RandomFeeds = () => {
  return (
    <View>
      <DescoveryDemand />
    </View>
  );
};

export default RandomFeeds;

const styles = StyleSheet.create({});
