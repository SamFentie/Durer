/*************  ✨ Codeium Command ⭐  *************/
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function UserLocationPicker({ adressDetailesFromTheMap }) {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [adressName, setAdressName] = useState("");
  const [formError, setFormError] = useState("");
  const [addressAvailable, setAddressAvailable] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleSelectLocation = async (coordinate) => {
    setLocation(coordinate);
    setAddressAvailable(true);
    let address = await Location.reverseGeocodeAsync(coordinate);
    setAddress(address[0]);
  };
  const handelAdressNameChange = (e) => {
    setAdressName(e);
    setFormError("");
  };

  const handelConfirmAdress = () => {
    if (!adressName) {
      setFormError("Adress name is required!");
      return;
    }
    if (!location) {
      setFormError("Please select a location on the map!");
      return;
    }
    const { street, city, country } = address;
    const { latitude, longitude } = location;
    const newAdress = {
      street,
      city,
      country,
      latitude,
      longitude,
      name: adressName,
    };
    adressDetailesFromTheMap(newAdress);

    console.log("Confirm Adress");
  };

  const handleTakeMeToLocation = (latitude, longitude) => {
    Linking.openURL(
      `googlemaps://?q=${latitude},${longitude}&z=16&center=${latitude},${longitude}`
    );
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={(e) => handleSelectLocation(e.nativeEvent.coordinate)}
      >
        {location && <Marker coordinate={location} />}
      </MapView>
      <View className="w-full justify-start h-28 bg-white-100 p-4 ">
        {addressAvailable ? (
          ""
        ) : (
          <Text className="font-interr text-base text-center">
            Please Zoom in and select your business location on the map.
          </Text>
        )}
        {address && (
          <>
            <Text>Street: {address.street}</Text>
            <Text>City: {address.city}</Text>
            <Text>Country: {address.country}</Text>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
          </>
        )}
      </View>
      <View className="p-4 bg-white-100">
        {formError && (
          <Text className="text-white-900 text-base font-interr">
            {formError}
          </Text>
        )}
        <Text className="text-base text-white-600 font-interr">
          Enter adress name
        </Text>
        <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
          <TextInput
            className="flex-1 font-interr text-[12px]"
            value={adressName}
            placeholder="Eneter the name of your adress"
            placeholderTextColor="#7b7b8b"
            onChangeText={handelAdressNameChange}
            required={true}
          />
        </View>
      </View>
      <View className="flex-row items-center justify-center w-1/2 mx-auto my-2 ">
        <TouchableOpacity
          className="bg-white-500 w-full h-[32px] px-4 rounded-lg flex-row "
          onPress={handelConfirmAdress}
        >
          <Text className="font-interr text-base text-white-100">
            Confirm Adreess
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

/******  05d546f1-1c73-42ab-a197-8d371ef5b6b5  *******/
