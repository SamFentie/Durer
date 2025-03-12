import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="px-2">
      <View className="flex flex-row items-center space-x-4 w-full h-[36px] px-4 bg-black-100 rounded-md border-[1px] border-white-300 focus:border-secondary">
        <TextInput
          className="text-base mt-0.5 text-white flex-1 font-pregular"
          value={query}
          placeholder="search in specific/catagories......."
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {
            if (query === "")
              return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
              );

            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
        >
          <Image
            source={icons.search}
            tintColor="#96A0AA"
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
