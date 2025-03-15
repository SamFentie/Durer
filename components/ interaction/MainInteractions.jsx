import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import InteractionsSimplefied from "./InteractionsSimplefied";
import { SafeAreaView } from "react-native";

const MainInteractions = ({ intractions }) => {
  return (
    <SafeAreaView className="mx-2 mt-3">
        <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ml-4">Interaction</Text>
      {intractions && (
        <FlatList
          className="mt-1"
          data={intractions}

          renderItem={({ item }) => <InteractionsSimplefied item={item} />}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // onScroll={handleOnScroll}
          // onViewableItemsChanged={handleOnViewableItemsChanged}
          // viewabilityConfig={viewabilityConfig}
        />
      )}
    </SafeAreaView>
  );
};

{
}

export default MainInteractions;

const styles = StyleSheet.create({});
