import { View, Text ,TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Search from "../../components/discovery/Search";
import DiscoveryOptions from "../../components/discovery/DiscoveryOptions";
import { demandData } from "../../demandsData";
import { shopesData } from "../../shopesData";
import DescoveryDemand from "../../components/demnads/DescoveryDemand";
import Shopes from "../../components/discovery/Shopes";
import { router } from "expo-router";
import { Button } from "react-native";


const Discovery = () => {
  const [demands, setDemands] = useState();
  const [shopes, setShopes] = useState();
  const [isDemandsactive, setIsDemandsActive] = useState(true);
  const [isShopesActive, setIsShopsActive] = useState(false);
  
  const demandFilter= (query) => {
    const filtered=demandData.filter(item => item.demand_category.includes(query))
    setDemands(filtered.length!==0?filtered:demandData);
  };
  const shopFilter = (query) => {
    const filtered=shopesData.filter(item => item.shope_category===query)
    setShopes(filtered.length!==0?filtered:shopesData);
  };
  const handelDemandesClick = (e) => {
    setIsDemandsActive(true);
    setIsShopsActive(false);
    router.push("/discovery");
  };
  const handelShopesClick = (e) => {
    setIsShopsActive(true);
    setIsDemandsActive(false);
    // router.push("/discovery/shopes");
  };
  useEffect(() => {
    setDemands(demandData);
    setShopes(shopesData);
  }, []);
  return (
    <SafeAreaView className="bg-white-100 m-2">
      <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ml-4">Discovery</Text>
      <View className="flex flex-row items-center space-x-4 w-full h-[36px] px-4 bg-black-100 rounded-md border-[1px] border-white-500 focus:border-secondary">
       <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
               
                placeholder="search in specific/catagories......."
                placeholderTextColor="#CDCDE0"
                onChangeText={(e) => isDemandsactive?demandFilter(e):shopFilter(e)}
              />
        <Button style={{backgroundColor:"#a6a746"}} onPress={()=>isDemandsactive?demandFilter():shopFilter()} title="Search" className="bg-white-500"/>
        </View>
      <DiscoveryOptions
        isDemandsactive={isDemandsactive}
        isShopesActive={isShopesActive}
        handelDemandesClick={handelDemandesClick}
        handelShopesClick={handelShopesClick}
      />
      {isDemandsactive && <DescoveryDemand demands={demands} />}
      {isShopesActive && <Shopes shopes={shopes} />}
    </SafeAreaView>
  );
};

export default Discovery;
