import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing
} from 'react-native';


export default function ToogleButton({status}) {

    const positionButton = useRef(new Animated.Value(0)).current;

  const [isOn, setIsOn] = useState(status);

  const startAnimToOff = () => {
    Animated.timing(positionButton,{
      toValue:0,
      duration:500,
      easing:Easing.ease,
      useNativeDriver: false
    }).start()
  };

  const startAnimToOn = () => {
 Animated.timing(positionButton,{
      toValue:1,
      duration:500,
      easing:Easing.ease,
      useNativeDriver: false
    }).start()

  };

  const positionInterPol = positionButton.interpolate({inputRange:[0,1],outputRange:[0,30]})

  const backgroundColorAnim = positionButton.interpolate({inputRange:[0,1],outputRange:["transparent","transparent"]})

  const initialOpacityOn = positionButton.interpolate({inputRange:[0,1],outputRange:[0,1]})

    const initialOpacityOff = positionButton.interpolate({inputRange:[0,1],outputRange:[1,0]})

  const onPress = () => {
    if (isOn) {
      startAnimToOff();
      setIsOn(false);
    } else {
      startAnimToOn();
      setIsOn(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{height:20,width:60}}  activeOpacity={0.9} onPress={onPress} >
      <Animated.View style={[styles.mainStyes,{
        backgroundColor:backgroundColorAnim
      }]} >
        <Animated.Text
          style={[
            styles.eahcStyles,
            {
              opacity: initialOpacityOn,
            },
          ]}>
          ON
        </Animated.Text>
        <Animated.Text
          style={[
            styles.eahcStylesOf,
            {
              opacity: initialOpacityOff,
            },
          ]}>
          OFF
        </Animated.Text>
        <Animated.View style={[styles.basicStyle,{
          transform:[{
            translateX:positionInterPol
          }]
        }]} />
          </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: 'center',
    
    
  },
  basicStyle: {
    height: 15,
    width: 15,
    borderRadius: 20,
    backgroundColor: '#a6a746',
    alignItems:"center",
    marginLeft: 5,
  },
  eahcStyles: {
    fontSize: 10,
    color: '#a6a746',
    position: 'absolute',
    alignSelf:"center",
    left: 5,
  },

  eahcStylesOf: {
    fontSize: 10,
    color: '#a6a746',
    position: 'absolute',
    alignSelf:"center",
    right: 5,
  },
  mainStyes: {
    borderRadius: 30,
    borderWidth:1,
    borderColor:"#a6a746",
    height: 25,
    width: 60,
    justifyContent:"center"
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});