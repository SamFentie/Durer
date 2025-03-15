import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import AWS from "aws-sdk";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import PhoneNumberByCountry from "../components/PhoneNumberByCountry";
import Gender from "../components/Gender";
import Dropdown from "../components/DropDown";
import DateTimePickers from "../components/DateTimePickers";
import { registerUsanIndividualUser } from "../context/api/api";
import countries from "../context/countries";
import { router } from "expo-router";
import { images } from "../constants";
// AWS S3 Configuration
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const REGION = process.env.AWS_REGION;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// Initialize AWS S3
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});
const s3 = new AWS.S3();

const CreateProfileUsRegularUser = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [country, setCountry] = useState("Ethiopia");
  const [city, setCity] = useState("");
  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    bio: "",
    gender: "",
    dateOfBirth: new Date(),
    country: "",
    city: "",
    isCompany: false,
    email: "",
  });

  const retrievePhaseOneData = async () => {
    const data = JSON.parse(await AsyncStorage.getItem("otpUserData"));

    return {
      email: data?.email,
      user_name: data?.user_name,
    };
  };

  // const pickImage = async () => {
  //   try {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission needed",
  //         "Please grant camera roll permissions to upload images."
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.canceled) {
  //       const imageUri = result.assets[0].uri;
  //       const response = await fetch(imageUri);
  //       const blob = await response.blob();
  //       const fileType = blob.type; // Dynamically get the file type
  //       const fileName = `profile_${Date.now()}.jpg`;

  //       // AWS S3 Upload Parameters
  //       const uploadParams = {
  //         Bucket: S3_BUCKET,
  //         Key: fileName,
  //         Body: blob,
  //         ContentType: fileType,
  //       };

  //       // Upload to S3
  //       s3.upload(uploadParams, (err, datas) => {
  //         if (err) {
  //           console.error("AWS Upload Error:", err);
  //           Alert.alert("Upload Failed", "Failed to upload image to AWS.");
  //           return;
  //         }
  //         // Successfully uploaded, set AWS URL
  //         setImage(datas.Location);
  //         setFormData((prev) => ({
  //           ...prev,
  //           profile_picture: { uri: imageUri, type: fileType, name: fileName },
  //         }));
  //       });
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to pick or upload image. Please try again.");
  //     console.error("Image picker error:", error);
  //   }
  // };

  // const pickImage = async () => {
  //   try {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission needed",
  //         "Please grant camera roll permissions to upload images."
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       const imageUri = result.assets[0].uri;
  //       const formData = new FormData();
  //       const fileType = imageUri.split(".").pop();

  //       formData.append("file", {
  //         uri: imageUri,
  //         name: `profile_${Date.now()}.${fileType}`,
  //         type: `image/${fileType}`,
  //       });
  //       // Fetch the secure upload URL from your backend
  //       const response = await fetch(
  //         "http://172.16.239.168:8000/profile/profilePicture",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log("Response of Generated URL", response);

  //       if (!response.ok) {
  //         const errorText = await response.text(); // Get error details
  //         console.error("Server error:", errorText);
  //         throw new Error("Failed to fetch upload URL");
  //       }

  //       const jsonResponse = await response.json();
  //       console.log("Parsed response:", jsonResponse);

  //       const { uploadURL } = jsonResponse;
  //       console.log("Upload URL:", uploadURL);

  //       // Convert imageUri to blob
  //       const imageBlob = await fetch(imageUri).then((res) => res.blob());

  //       // Create a FormData object

  //       const uploadResponse = await fetch(uploadURL, {
  //         method: "PUT",
  //         headers: {
  //           Accept:
  //             "application/json, application/xml, text/plain, text/html, *.*",
  //           "Content-Type": "multipart/form-data",
  //         },
  //         body: imageBlob,
  //       });

  //       console.log("Upload response status:", uploadResponse.status);
  //       const uploadResponseText = await uploadResponse.text(); // Get raw response
  //       console.log("Upload response text:", uploadResponseText);

  //       if (!uploadResponse.ok) {
  //         throw new Error("Upload failed: " + uploadResponseText);
  //       }

  //       // Since S3 usually doesn't return JSON, just handle the upload completion
  //       console.log("Upload completed successfully!");

  //       // Access the image URL from the upload URL directly
  //       const imageURL = uploadURL.split("?")[0]; // Get the URL without query parameters
  //       console.log("This is the Image URL", imageURL);

  //       // Set the image and form data
  //       setImage(imageURL);
  //       setFormData((prev) => ({
  //         ...prev,
  //         profile_picture: {
  //           uri: imageURL,
  //           type: `image/${fileType}`,
  //           name: `profile_${Date.now()}.${fileType}`,
  //         },
  //       }));
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to pick or upload image. Please try again.");
  //     console.error("Image picker error:", error);
  //   }
  // };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant camera roll permissions to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const fileType = imageUri.split(".").pop();

        // Fetch the secure upload URL from your backend
        const response = await fetch(
          "http://172.16.239.168:8000/profile/profilePicture",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server error:", errorText);
          throw new Error("Failed to fetch upload URL");
        }

        const jsonResponse = await response.json();
        const { uploadURL } = jsonResponse;
        console.log("Upload URL:", uploadURL);

        // Convert imageUri to blob
        const imageBlob = await fetch(imageUri).then((res) => res.blob());

        // Upload the file using PUT
        const uploadResponse = await fetch(uploadURL, {
          method: "PUT",
          headers: {
            "Content-Type": `image/${fileType}`,
          },
          body: imageBlob, // Use blob instead of URI
        });

        if (!uploadResponse.ok) {
          const uploadResponseText = await uploadResponse.text();
          throw new Error("Upload failed: " + uploadResponseText);
        }

        console.log("Upload completed successfully!");

        // Get the final image URL
        const imageURL = uploadURL.split("?")[0];
        console.log("This is the Image URL", imageURL);

        // Update state
        setImage(imageURL);
        setProfilePicture({
          uri: imageURL,
          type: `image/${fileType}`,
          name: `profile_${Date.now()}.${fileType}`,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick or upload image. Please try again.");
      console.error("Image picker error:", error);
    }
  };
  const handelDateOfBirthChange = (value) => {
    setDateOfBirth(formatDate(value)); // YYYY-MM-DD format
    setFormData((prev) => ({
      ...prev,
      dateOfBirth,
    }));
    console.log(dateOfBirth);
    setServerError(null);
    setFormError(null);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const submit = async () => {
    const phaseOneData = await retrievePhaseOneData();
    const email = phaseOneData.email;
    // setFormData((prev) => ({
    //   ...prev,
    //   name,
    //   phoneNumber,
    //   bio,
    //   gender,
    //   dateOfBirth: formatDate(new Date()),
    //   country,
    //   city,
    //   isCompany: false,
    //   email: email,
    // }));
    const requestData = {
      name,
      phoneNumber,
      bio,
      gender,
      dateOfBirth: formatDate(new Date()),
      country,
      city,
      isCompany: false,
      email,
      profile_picture: profilePicture.uri,
    };
    if (!name || !phoneNumber || !dateOfBirth || !country || !email) {
      setFormError("All fields are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUsanIndividualUser(requestData);
      if (response.error) {
        setServerError(response.error);
        setFormError(null);
      } else {
        Alert.alert("Success", "Profile created successfully!");
        setServerError(null);
        setFormError(null);
        router.replace("/");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setServerError("Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-white-100 h-full pb-8">
      <ScrollView>
        <View className="w-full justify-center items-center h-full min-h-[85vh] px-4">
          <Text className="text-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600">
            Create profile
          </Text>
          <TouchableOpacity
            className="text-white-500 p-2 font-bold"
            onPress={pickImage}
          >
            {images || image ? (
              <Image
                source={image ? { uri: image } : images.follow}
                resizeMode="contain"
                className="w-32 h-32 items-center justify-center mt-1"
              />
            ) : (
              <View className="w-32 h-32 bg-gray-300 items-center justify-center mt-1">
                <Text className="text-black">No Image</Text>
              </View>
            )}
          </TouchableOpacity>

          {formError && (
            <Text className="text-red-500 font-interr mt-2">{formError}</Text>
          )}
          {serverError && (
            <Text className="text-red-500 font-interr mt-2">{serverError}</Text>
          )}

          <FormField
            title="Full name"
            placeholder="Enter your full name"
            value={name}
            handleChangeText={setName}
            otherStyles="mt-7"
          />
          <PhoneNumberByCountry
            items={countries}
            title="Phone number"
            placeholder="-000-00-0000"
            value={phoneNumber}
            handleChangeText={setPhoneNumber}
            otherStyles="mt-7"
          />
          <FormField
            title="Bio"
            placeholder="Enter your bio"
            value={bio}
            handleChangeText={setBio}
            otherStyles="mt-7"
          />
          <Gender
            title="Gender"
            placeholder="Male"
            value={gender}
            handleChangeText={setGender}
            otherStyles="mt-7"
          />
          <DateTimePickers
            title="Birth date"
            placeholder="2000-01-01"
            value={dateOfBirth}
            handleChangeText={handelDateOfBirthChange}
            otherStyles="mt-7"
          />
          <Dropdown
            title="Country"
            items={countries}
            placeholder="Ethiopia"
            value={country}
            handleChangeText={setCountry}
            otherStyles="mt-7"
          />
          <FormField
            title="City/Province"
            placeholder="Bole, Addis Ababa"
            value={city}
            handleChangeText={setCity}
            otherStyles="mt-7"
          />

          <View className="mt-7 w-full">
            <CustomButton
              title="Save"
              handelPress={submit}
              isLoading={isSubmitting}
              containerStsyles="w-full bg-white-500"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F9F9FA" />
    </SafeAreaView>
  );
};

export default CreateProfileUsRegularUser;
