import { Image, StyleSheet, Text, View,FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { images } from "../../constants";

const IntractionsLits = ({ intractionData }) => {
  const [numberOfWehavit, setNumberOFWeHaveIt] = useState(0);
  const [numberOfWeCanPrepare, setNumberOFWeCanPrepare] = useState(0);
  const [expand,setExpand]=useState("")

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
    <View className="flex-col gap-4 items-center">
    <View className="flex-row gap-4 items-start">
      <View className="flex-row gap-2 ">
          <Accordion title={(numberOfWehavit ? numberOfWehavit: 0)+ " Have it"}>
              <FlatList data={intractionData.filter(item => item.intraction_type !== 0)} renderItem={({item})=>
                  <Text onPress={() => setExpand(expand===item?"":item)}  className="border-2 border-white-500 px-3 py-2 rounded-md mb-2">{item.company_name}</Text>
                }/>
          </Accordion>
      </View>
      <View className="flex-row gap-2 ">
          <Accordion title={(numberOfWeCanPrepare ? numberOfWeCanPrepare: 0)+ " Can Prepare it"}>
              <FlatList data={intractionData.filter(item => item.intraction_type !== 1)} renderItem={({item})=>
                  <Text onPress={() => setExpand(expand===item?"":item)} style={styles.container}>{item.company_name}</Text>
                }/>
          </Accordion>
      </View>
      
    </View>
    {/* Description */}
    {expand&&
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
    </View>
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


