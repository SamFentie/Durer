import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet ,Image} from "react-native";
import { images } from "../../constants";
const Accordion = ({ title, children ,expandedA, setExpandedA}) => {
 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setExpandedA(!expandedA)}>
        <View className="flex-row gap-2 ">
                <View>
                  <View>
                    <View className="flex-row relative">
                      <View className="absolute top-0 left-0">
                        <Image
                          source={images.shope}
                          resizeMode="contain"
                          tintColor="fff"
                          className="w-6 h-6"
                        />
                      </View>
                      <View className="absolute top-0 left-2">
                        <Image
                          source={images.shope}
                          resizeMode="contain"
                          tintColor="fff"
                          className="w-6 h-6"
                        />
                      </View>
                    </View>
                  </View>
                </View>
                <View className="flex-row pl-6 pt-[3px] items-center">
                  
       
                <Text style={styles.title}>{title}</Text>
                </View>
              </View>
      </TouchableOpacity>
      {expandedA && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    
    padding: 15,
    alignItems: "center",
  },
  title: {
    marginLeft:5,
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default Accordion;
