import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { intractionData } from "../../intractions";
import MainInteractions from "../../components/ interaction/MainInteractions";
const Interaction = () => {
  const [intractions, setInteractions] = useState();
  useEffect(() => {
    setInteractions(intractionData);
  }, []);
  return (
    intractions && (
      <SafeAreaView className="bg-white-100 m-2">
        {intractions?<MainInteractions intractions={intractions} />:
        <Text>No Interaction Data.</Text>
        }
      </SafeAreaView>
    )
  );
};

export default Interaction;
