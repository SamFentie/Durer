import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Switch
} from "react-native";
import { Audio } from "expo-av";
import React, { useState, useEffect, useCallback } from "react";
import images from "../../constants/images";
import ReactToDemand from "./ReactToDemand";
import FurtherQ from "./FurtherQ";
import DemandsAudioWaveform from "../audio/DemandsAudioWaveform";
import ToogleButton from "./Toggle";

const MainDemandsSimplifyed = ({
  
  item,
  key,
  currentSound,
  setCurrentSound,
  playingId,
  setPlayingId,
}) => {
  const [wehaveIt, setWeHaveIT] = useState(false);
  const [weCanPrepare, setWeCanPrepare] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [isEnabled,setIsEnabled]=useState(true)
  const handleAudio = async (audioUrl) => {
    try {
      // If already playing this audio, stop it
      if (playingId === item.id) {
        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }
        setCurrentSound(null);
        setPlayingId(null);
        setPlaybackStatus(null);
        return;
      }

      // If another audio is playing, stop it first
      if (currentSound) {
        await currentSound.stopAsync();
        await currentSound.unloadAsync();
        setCurrentSound(null);
      }

      // Play the new audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );

      newSound.setOnPlaybackStatusUpdate((status) => {
        setPlaybackStatus(status);
        if (status.didJustFinish) {
          newSound.unloadAsync();
          setCurrentSound(null);
          setPlayingId(null);
          setPlaybackStatus(null);
        }
      });

      setCurrentSound(newSound);
      setPlayingId(item.id);
    } catch (error) {
      console.error("Error handling audio:", error);
      setCurrentSound(null);
      setPlayingId(null);
      setPlaybackStatus(null);
    }
  };

  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, [currentSound]);

  const handelWeHaveIT = () => {
    setWeHaveIT(!wehaveIt);
    setWeCanPrepare(false);
  };

  const handelWeCanPrepare = () => {
    setWeCanPrepare(!weCanPrepare);
    setWeHaveIT(false);
  };
 const toggleSwitch=()=>{
    setIsEnabled(!isEnabled)
 }
  return (
    <View className="mb-4 mx-2">
      <View
        className="bg-white-400 rounded-md p-4 relative shadow-md"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,
        }}
        key={key}
      >
        <View className="flex-row justify-between max-h-80">
          {item.image_question && (
            <View className="w-1/3 max-h-32 rounded-lg border-2 border-white-500">
              
              {item.image_question? <Image
                source={item.image_question }
                resizeMode="contain"
                className="w-full h-full rounded-md"
                style={{
                  width: "100%", // Make image take full width
                  height: "100%", // Make image take full height of container
                  resizeMode: "cover",
                }}
              />:<Text>Image</Text> }
            </View>
          )}
          <View className={item.image_question ? "w-2/3 pl-4 mt-5" : "w-full"}>
            <View>
              <Text>{item.text_question}</Text>
            </View>

            <View className="flex-row">
              {item.Categories &&
                item.Categories.map((category, index) => (
                  <View className="mx-1" key={index}>
                    <Text className="text-white-300">
                      #{category.category_name}
                    </Text>
                  </View>
                ))}
            </View>
            {item.voice_question && (
              <View className="w-60 h-8 flex-row items-center">
                <TouchableOpacity
                  onPress={() => handleAudio(item.voice_question)}
                >
                  <DemandsAudioWaveform
                    uri={item.voice_question}
                    playbackStatus={playbackStatus}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row justify-between items-center gap-2">
            <View className="h-6 w-6 items-center justify-center rounded-full border-2 border-white-500">
              {/*---->uri: item.creator.ProfilePictures[0]?.path  */}
              {item.user_profile?<Image
                source={ item.user_profile?item.user_profile:images.profile}
                resizeMode="contain"
                className="w-4 h-4"
              />:<Text>{item.user_profile}</Text>}
            </View>
            <View>
              <Text className="font-interr">
                {/* --> item.creator.first_name.length > 15
                  ? item.creator.first_name.slice(0, 15) + "..."
                  : item.creator.first_name:*/}
              {item.user}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            {item.status!==undefined&&<ToogleButton status={item.status}/>}
          </View>
        </View>

        <View className="absolute top-0 right-2">
          <Image
            source={images.shope}
            resizeMode="contain"
            tintColor="fff"
            className="w-6 h-6 mr-5"
          />
          <View className="absolute right-[2px] w-4 h-4 justify-center items-center p-[2px] bg-white-600 rounded-full z-90">
            <Text
              className={
                item.number_of_intreactions > 99
                  ? "text-white-500 text-[8px] font-interr items-center "
                  : `text-white-400 text-[8px] font-interr items-center `
              }
            >
              {item.number_of_intreactions > 99
                ? 99 + "+"
                : item.number_of_intreactions}
            </Text>
          </View>
        </View>
      </View>

{item.status===undefined&&<ReactToDemand
        wehaveIt={wehaveIt}
        weCanPrepare={weCanPrepare}
        handelWeHaveIT={handelWeHaveIT}
        handelWeCanPrepare={handelWeCanPrepare}
      />}
      {(wehaveIt || weCanPrepare) && (
        <FurtherQ furtherQ={item.further_question} />
      )}
    </View>
  );
};

export default MainDemandsSimplifyed;
