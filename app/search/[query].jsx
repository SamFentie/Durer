import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { demandData } from "../../demandsData";
import DescoveryDemand from "../../components/demnads/DescoveryDemand";
const filterByCategory = (data, category) => {
  return data.filter(item => item.demand_category.includes(category));
};

const Search = () => {
  const params = useLocalSearchParams();
    const query= params?.query;
    const demands=filterByCategory(demandData, query);
    
  return (
    <View>
     
      <DescoveryDemand demands={demands} /> 
    </View>
  );
};

export default Search;
   