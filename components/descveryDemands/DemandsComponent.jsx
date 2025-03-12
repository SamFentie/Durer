import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DemandSimplifyed from "./DemandSimplifyed";

const DemandsComponent = ({ demands }) => {
  return (
    <View>
      {demands && (
        <FlatList
          className="mt-7"
          data={demands}
          renderItem={({ item }) => <DemandSimplifyed item={item} />}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          // onScroll={handleOnScroll}
          // onViewableItemsChanged={handleOnViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      )}
    </View>
  );
};

export default DemandsComponent;

const styles = StyleSheet.create({});
