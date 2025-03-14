import { Image, StyleSheet, Text, View,FlatList} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { images } from "../../constants";
import { ScrollView } from "react-native-gesture-handler";

const IntractionsLits = ({ intractionData }) => {
  const [numberOfWehavit, setNumberOFWeHaveIt] = useState(0);
  const [numberOfWeCanPrepare, setNumberOFWeCanPrepare] = useState(0);
  const [expand,setExpand]=useState("")
   const [haveit, setHaveit] = useState(false);
   const [wecan, setWecan] = useState(false);
  const countInteractionTypeZero = (arr) => {
    return arr.filter(obj => obj.intraction_type===0).length;
  };

  useEffect(() => {
    setNumberOFWeHaveIt(
      countInteractionTypeZero(intractionData)
    );
    
    setNumberOFWeCanPrepare(
      intractionData.length - countInteractionTypeZero(intractionData)
    );
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }} className="flex-col gap-4 items-center">
    <View className="flex-row gap-4 items-start">
      <View className="flex-row gap-2 ">
          <Accordion title={(numberOfWehavit ? numberOfWehavit: 0)+ " Have it"} expandedA={haveit} setExpandedA={setHaveit}>
              <ScrollView className="max-h-24 border-l-2 border-r-2 border-b-2 border-white-500 rounded-md p-1" nestedScrollEnabled>
                <FlatList  data={intractionData.filter(item => item.intraction_type !== 1)} renderItem={({item})=>
                    <Text onPress={() => setExpand(expand===item?"":item)}  className="border-2 border-white-500 px-1 py-1 rounded-md mb-2">{item.company_name}</Text>
                  }/>
              </ScrollView>
          </Accordion>
      </View>
      <View className="flex-row gap-2 ">
          <Accordion title={(numberOfWeCanPrepare ? numberOfWeCanPrepare: 0)+ " Can Prepare it"}  expandedA={wecan} setExpandedA={setWecan}>
              <ScrollView className="max-h-24 border-l-2 border-r-2 border-b-2 border-white-500 rounded-md p-1" nestedScrollEnabled>
                <FlatList data={intractionData.filter(item => item.intraction_type !== 0)} renderItem={({item})=>
                    <Text onPress={() => setExpand(expand===item?"":item)} className="border-2 border-white-500 px-1 py-1 rounded-md mb-2">{item.company_name}</Text>
                  }/>
              </ScrollView>
          </Accordion>
      </View>
      
    </View>
    {/* Description */}
    {expand && haveit &&
      <View className="flex-col items-center border-2 border-white-500 p-4">
        <View className="flex flex-row gap-2  items-center">
          <Image  source={images.shope}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"/>
           <Text>{expand.company_name}</Text>
        </View>
        <View className="flex-col items-start flex" style={styles.box}>
           <Text className="border-t-2 border-white-500" style={styles.box}>{expand.company_name} is able to supply the item you want to purchase</Text>
           <Text className="border-t-2 border-white-500" style={styles.question}>{expand.company_name} Answers</Text>
           <FlatList data={expand.answers} renderItem={({item})=>
              <View className="flex-col" style={styles.box}>
                <Text className="border-t-2 border-white-500" style={styles.question}>{'\u2B24'} {item.q}</Text>
                <Text className="border-t-2 border-white-500" style={styles.answer}>{item.fQ_ans}</Text>
              </View>
          }/>
           
        </View> 
      </View>
    }
    {expand && wecan &&
      <View className="flex-col items-center border-2 border-white-500 p-4">
        <View className="flex flex-row gap-2  items-center">
          <Image  source={images.shope}
                  resizeMode="contain"
                  tintColor="fff"
                  className="w-6 h-6"/>
           <Text>{expand.company_name}</Text>
        </View>
        <View className="flex-col items-start flex" style={styles.box}>
           <Text className="border-t-2 border-white-500" style={styles.box}>{expand.company_name} is able to supply the item you want to purchase</Text>
           <Text className="border-t-2 border-white-500" style={styles.question}>{expand.company_name} Answers</Text>
           <FlatList data={expand.answers} renderItem={({item})=>
              <View className="flex-col" style={styles.box}>
                <Text className="border-t-2 border-white-500" style={styles.question}>{'\u2B24'} {item.q}</Text>
                <Text className="border-t-2 border-white-500" style={styles.answer}>{item.fQ_ans}</Text>
              </View>
          }/>
           
        </View> 
      </View>
    }
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "tan",
    borderRadius: 5,
    marginBottom: 2,
    overflow: "hidden",
    padding:3
  },
  box:{
    alignSelf:"stretch",
  },
  question:{
    fontWeight: "bold",
    alignSelf: "stretch",
  },
  answer:{
    paddingLeft:30,
    alignSelf: "stretch",
  },
  
})

export default IntractionsLits;


