import { FlatList, StyleSheet,  View ,Text} from "react-native";
import React, { useState } from "react";
import MainDemandsSimplifyed from "./MainDemandsSimplifyed";

const MainDemands = ({ demands ,children }) => {
  const [currentSound, setCurrentSound] = useState(null);
  const [playingId, setPlayingId] = useState(null);

  return (
    <View className="flex-1">
      {demands ? (
        <FlatList
          className="mt-7"
          data={demands}
          ListHeaderComponent={children}
          renderItem={({ item, index }) => (
            <MainDemandsSimplifyed
              item={item}
              key={index}
              currentSound={currentSound}
              setCurrentSound={setCurrentSound}
              playingId={playingId}
              setPlayingId={setPlayingId}
            />
            
          )}
          showsVerticalScrollIndicator={false}
        />
      ):<Text  className={` text-xs`}
      style={{ color: "#96A0AA" }}>No Demand Found.</Text>}
    </View>
  );
};

export default MainDemands;

const styles = StyleSheet.create({});
