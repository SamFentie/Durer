import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { icons } from "../../constants";
import SearchInput from "../SearchInput";

const Search = ({ handleChangeText }) => {
  return <SearchInput initialQuery={handleChangeText} />;
};

export default Search;

const styles = StyleSheet.create({});
