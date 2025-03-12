import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Requests from "../../components/request/Requests";

const Request = () => {
  return (
    <SafeAreaView className="bg-white-100">
      <Requests />
    </SafeAreaView>
  );
};

export default Request;
