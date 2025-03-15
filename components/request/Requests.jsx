import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  setQuestions,
  setLoading,
  setError,
  selectQuestions,
  selectQuestionsLoading,
  selectQuestionsError,
  selectQuestionsPagination
} from '../../context/slices/questionSlice';
import WhatDoYouWant from "./WhatDoYouWant";
import CategorizeYourRequest from "./CategorizeYourRequest";
import QuestionsYouWantToAsk from "./QuestionsYouWantToAsk";
import CustomButton from "../CustomButton";
import { getUserInfo } from "../../utils/user";
import { createRequest } from "../../context/api/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfileUploadPath } from "../../context/api/api";

const Requests = () => {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const loading = useSelector(selectQuestionsLoading);
  const error = useSelector(selectQuestionsError);
  const pagination = useSelector(selectQuestionsPagination);
  const [wants, setWants] = React.useState({});
  const [need_category, setNeedCategory] = React.useState("");
  const [fur_q, setFurQ] = React.useState("");
  const [fur_q1, setFurQ1] = React.useState("");
  const [fur_q2, setFurQ2] = React.useState("");
  const [fur_q3, setFurQ3] = React.useState("");
  const [fur_q4, setFurQ4] = React.useState("");
  const [imagepath, setImagePath] = React.useState(null);

  const [audioPath, setAudioPath] = React.useState(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState(null);
  const getUserInfo = async () => {
    const userInfo = await AsyncStorage.getItem("user_info");
    return JSON.parse(userInfo);
  };
  const hnadelWantsChange = (e, type) => {
    setIsSubmitting(false);
    switch (type) {
      case "text":
        setWants({ ...wants, text: e });
        break;
      case "imageuri":
        setWants({ ...wants, imageuri: e });
        break;
      case "audiouri":
        setWants({ ...wants, audiouri: e });
        break;

      case "canclaudiouri":
        setWants({ ...wants, audiouri: null });
        break;

      case "canclimageuri":
        setWants({ ...wants, imageuri: null });
        break;
    }
  };
  const hnadelNeedCategoryChange = (e) => {
    setNeedCategory(e);
    setIsSubmitting(false);
  };
  const hnadelFurQChange = (e) => {
    setFurQ(e);
    setIsSubmitting(false);
  };
  const formData = new FormData();

  const handelFurQChange = (e, i) => {
    setIsSubmitting(false);
    switch (i) {
      case 1:
        setFurQ1(e);
        break;
      case 2:
        setFurQ2(e);
        break;
      case 3:
        setFurQ3(e);
        break;
      case 4:
        setFurQ4(e);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true); // Start the submission process

    let user = await getUserInfo();
    let id = user?.id;
    let token = user?.token;

    if (!(wants.audiouri || wants.imageuri || wants.text)) {
      setFormError("Please fill what you want");
      Alert.alert("Error", "Please fill what you want");
      setIsSubmitting(false);
      return;
    }
    const furQArray = [
      { fur_q1: fur_q1 },
      { fur_q2: fur_q2 },
      { fur_q3: fur_q3 },
      { fur_q4: fur_q4 },
    ];
    setFurQ(furQArray);

    if (wants.imageuri) {
      const blob = await (await fetch(wants.imageuri.imageuri)).blob();
      const awspath = await getUserProfileUploadPath(id, token); // Ensure id and token are defined
      // if (!awspath) {
      //   return;
      // }
      //image questions upload

      const response = await fetch(awspath.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": wants.imageuri.mimeType || "multipart/form-data",
        },
        body: blob,
      });
      setImagePath(awspath.uploadURL.split("?")[0]);

      // if (!response.ok) {
      //   throw new Error("Failed to upload file");
      // }
    }
    // end of image upload

    //audio questions upload
    if (wants.audiouri.uri) {
      console.log("blob=========" + wants.audiouri);
      const blob = await (await fetch(wants.audiouri.uri)).blob();
      const awspath = await getUserProfileUploadPath(id, token); // Ensure id and token are defined
      // if (!awspath) {
      //   return;
      // }
      const response = await fetch(awspath.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "audio/webm" || "audio/mpeg",
        },
        body: blob,
      });
      setAudioPath(awspath.uploadURL.split("?")[0]);
      // if (!response.ok) {
      //   throw new Error("Failed to upload file");
      // }
    }
    // end of audio upload

    const formData = {
      wants: wants.text,
      audios: audioPath,
      images: imagepath,
      need_category: need_category,
      fur_q: fur_q,
    };
    console.log(
      "form data is posted at =================== + " +
        JSON.stringify(formData) +
        " profile your==ssdsssss"
    );

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Replace yourTokenHere with the actual token
      },
    };

    try {
      await createRequest(formData, config).then((res) => {
        setIsSubmitting(false);
        console.log(res);
        if (res.err) {
          Alert.alert("Error", res.err);
        }
      });
      // Handle successful submission...
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false); // End the submission process
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="mt-7 mb-2">
        <WhatDoYouWant wnats={wants} hnadelWantsChange={hnadelWantsChange} />
        <CategorizeYourRequest
          need_category={need_category}
          hnadelNeedCategoryChange={hnadelNeedCategoryChange}
        />
        <QuestionsYouWantToAsk
          fur_q={fur_q}
          handelFurQChange={handelFurQChange}
        />
        <View className=" flex-row justify-center items-center text-center">
          <TouchableOpacity
            onPress={handleSubmit}
            className="mt-7 bg-white-500 py-2 px-20 rounded-lg"
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text className="font-bold text-white-100 text-lg">Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Requests;

const styles = StyleSheet.create({});
