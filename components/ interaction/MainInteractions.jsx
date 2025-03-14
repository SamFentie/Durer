import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import InteractionsSimplefied from "./InteractionsSimplefied";

const MainInteractions = ({ intractions }) => {
  return (
    <View className="mx-2">
      {intractions && (
        <FlatList
          className="mt-7"
          data={intractions}
          renderItem={({ item }) => <InteractionsSimplefied item={item} />}
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

{
}

export default MainInteractions;

const styles = StyleSheet.create({});
