import React from "react";
import ShopsSimplified from "./ShopesSimplfiyed";

import { View, Text, Image, FlatList, ScrollView, StyleSheet } from "react-native";
import { images } from "../../constants";



const ShopItemList= ({ items }) => {
  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Image source={images.profile} style={styles.profileImage} />
            <Text style={styles.userName}>{item.user}</Text>
          </View>

          {/* Shop Images */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
            {item.profile_images.map((img, idx) => (
              <Image key={idx} source={images.camera} style={styles.shopImage} />
            ))}
          </ScrollView>

          {/* Category */}
          <Text style={styles.category}>Category: {item.shope_category}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageScroll: {
    flexDirection: "row",
    marginVertical: 10,
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  category: {
    fontSize: 14,
    color: "#666",
  },
});




const Shopes = ({ shopes }) => {
  return (
    <View className="flex-row w-full">
      {shopes && <ShopItemList items={shopes} />}

    </View>
  );
};

export default Shopes;


