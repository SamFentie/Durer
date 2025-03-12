import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "../../constants/images";
import ReactToDemand from "./ReactToDemand";
import FurtherQ from "./FurtherQ";
import Waveform from "../audio/Waveform";

const DesoveryDemandsSimplifed = ({ item }) => {
  const [wehaveIt, setWeHaveIT] = useState(false);
  const [weCanPrepare, setWeCanPrepare] = useState(false);
  const { width } = useWindowDimensions();
  function isPrime(num) {
    if (num <= 2) return false; // Numbers less than or equal to 1 are not prime
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false; // If num is divisible by any number other than 1 and itself
      }
    }
    return true; // If no divisors were found, num is a prime number
  }
  function isDivisibleByFive(num) {
    if (num % 5 === 0) {
      return true;
    }
  }
  const handelWeHaveIT = () => {
    setWeHaveIT(!wehaveIt);
    setWeCanPrepare(false);
  };
  const handelWeCanPrepare = () => {
    setWeCanPrepare(!weCanPrepare);
    setWeHaveIT(false);
  };

  const styles = StyleSheet.create({
    card: {
      flex: 2,
      backgroundColor: "#fff",
      padding: 2,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      marginTop: 10,
      height: 200,
      alignItems: "center",
      justifyContent: "space-around",
    },
    cardTwo: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 2,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      marginTop: 10,
      width: width,
      height: 200,
      alignItems: "center",
      justifyContent: "space-between",
      marginEnd: 8,
    },
    cardThree: {
      flex: 2,
      marginTop: 10,
      width: width - 20,
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      marginTop: 10,
      position: "absolute",
      left: 0,
      right: 0,
      height: 200,
    },
  });
  return (
    <View style={styles.cardTwo}>
      <View className="bg-white-400 mb-4 rounded-md p-4 relative ">
        <View
          className={
            item.image_question && isPrime(item.id)
              ? "flex-col justify-between max-h-80 items-center"
              : "flex-row justify-between max-h-80 "
          }
        >
          {item.image_question && (
            <View
              className={
                isPrime(item.id) ? "w-1/3 max-h-32 " : "w-1/3 max-h-32 "
              }
            >
              <Image
                source={item.image_question}
                resizeMode="contain"
                tintColor="fff"
                className="w-full h-12 rounded-lg border-2 border-white-500"
              />
            </View>
          )}
          <View
            className={
              item.image_question
                ? isPrime(item.id)
                  ? "w-full"
                  : "w-2/3 pl-4"
                : "w-full"
            }
          >
            <View>
              <Text>
                {item.text_question
                  ? item.text_question && item.text_question.length > 40
                    ? item.image_question && isPrime(item.id)
                      ? item.text_question.slice(0, 20) + "..."
                      : item.text_question.slice(0, 40) + "..."
                    : item.text_question.slice(0, 40) + "..."
                  : item.text_question}
              </Text>
            </View>

            {item.voice_question && (
              <View className="w-60 h-8 flex-row items-center">
                <View>
                  <Waveform uri={item.voice_question} />
                </View>
              </View>
            )}
          </View>
        </View>

        <View
          className={
            isPrime(item.id) && item.image_question
              ? "absolute  right-2"
              : " absolute  right-2 "
          }
        >
          <Image
            source={images.shope}
            resizeMode="contain"
            tintColor="fff"
            className="w-6 h-6"
          />
          <View
            className={
              isPrime(item.id) && item.image_question
                ? "absolute top-[-10px] right-[2px] w-4 h-4 justify-center items-center p-[2px] bg-white-600 rounded-full"
                : "absolute top-[-10px] right-[2px] w-4 h-4 justify-center items-center p-[2px] bg-white-600 rounded-full"
            }
          >
            <Text
              className={
                item.number_of_intreactions > 99
                  ? "text-white-500 text-[8px] font-semibold items-center "
                  : `text-white-400 text-[8px] font-semibold items-center `
              }
            >
              {item.number_of_intreactions > 99
                ? 99 + "+"
                : item.number_of_intreactions}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center pr-2">
          {item.demand_category.slice(0, 2).map((category) => (
            <View>
              <Text>{isPrime(item.id) ? "" : "#" + category.slice(0, 8)}</Text>
            </View>
          ))}
        </View>
        <View
          className={
            isPrime(item.id) && item.image_question
              ? "flex-row justify-between mt-2"
              : "flex-row justify-between mt-2"
          }
        >
          <View className="flex-row justify-between items-center gap-2 ">
            <View className="h-6 w-6 items-center justify-center rounded-full border-2 border-white-500">
              <Image
                source={item.user_profile}
                resizeMode="contain"
                tintColor="fff"
                className="w-4 h-4"
              />
            </View>

            <View>
              <Text className="font-semibold">{item.user}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DesoveryDemandsSimplifed;
