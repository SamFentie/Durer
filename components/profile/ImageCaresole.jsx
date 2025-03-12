import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
const { width, height } = Dimensions.get("screen");
const ImageCaresole = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        key={item.id}
        source={{ uri: item.path }}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default ImageCaresole;
const styles = StyleSheet.create({
  container: {
    width,
    height: 340,
    alignItems: "center",
  },
  image: {
    flex: 0.8,
    width: "100%",
  },
});
