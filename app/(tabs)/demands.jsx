import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestions,
  selectQuestionsLoading,
  selectQuestionsError,
  selectQuestionsPagination,
  setQuestions,
  setLoading,
  setError,
} from "../../context/slices/questionSlice";
import { getAllQuestions } from "../../context/api/questions";
import MainDemands from "../../components/demnads/MainDemands";
import { StatusBar } from "expo-status-bar";
import { demandData } from "../../demandsData";

const Demands = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const [demand,setDemand]=useState()
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        dispatch(setLoading(true));
        // const data = await getAllQuestions();
        // console.log("questions==============", data);
        dispatch(setQuestions(demandData));
        setDemand(demandData)
        // console.log(questions)
      } catch (err) {
        dispatch(setError(err.message));
        console.error("Error fetching questions:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return (
    <View className="flex-1 px-5">
      <View className="flex-1 pt-4 ">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
          </View>
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text>Error: {error}</Text>
          </View>
        ) : questions?.length ? (
          <View className="flex-1 justify-center items-center">
            <Text>No questions found</Text>
          </View>
        ) : (
          
          <MainDemands demands={demand} >
           <></>
          </MainDemands>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Demands;
