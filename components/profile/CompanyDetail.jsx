import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Modal,
  ScrollView,
  ActivityIndicator,
  DocumentViewer, // Import DocumentViewer
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { images } from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import * as ImagePicker from "expo-image-picker";
import {
  createCertificate,
  getUserProfileUploadPath,
} from "../../context/api/api"; // Import createCertificate function

const CompanyDetail = ({ userInfo, token, profileOwnerId }) => {
  console.log("User Info:", userInfo); // Debugging log to check the structure of userInfo
  const [expnadDetail, setExpanDetail] = useState(true);
  const [expandContacts, setExpandContacts] = useState(false);
  const [expandAdress, setExpandAdress] = useState(false);
  const [expandSocialMedia, setExpandSocialMedia] = useState(false);
  const [expandProductList, setExpandProductList] = useState(false);
  const [expandLicence, setExpandLicence] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [uploading, setUploading] = useState(false); // State for upload loading
  const [profileImages, setProfileImages] = useState([]); // State for storing profile images
  const [error, setError] = useState(null); // State for error handling

  console.log("userInfo+++", userInfo);

  const id = userInfo ? userInfo.id : null; // Ensure this matches the structure of your userInfo object

  const handleNavigateToMap = () => {
    const addressDetails = userInfo.UserAdressDetails;
    if (addressDetails && addressDetails.length > 0) {
      const { latitude, longitude } = addressDetails[0];
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  const handleSocialMediaRedirect = (url) => {
    Linking.openURL(url);
  };

  const handelExpandDetailPress = ({ tobePressed }) => {
    switch (tobePressed) {
      case "contact":
        setExpandContacts(!expandContacts);
        break;
      case "adress":
        setExpandAdress(!expandAdress);
        break;
      case "socialMedia":
        setExpandSocialMedia(!expandSocialMedia);
        setModalVisible(true);
        break;
      case "productList":
        setExpandProductList(!expandProductList);
        break;
      case "licence":
        setExpandLicence(!expandLicence);
        break;
    }
  };

  const hasLicensesAndCertificates =
    userInfo && userInfo.LicenceAndCirtificates;

  const updateCertificates = () => {
    console.log("Updating certificates...");
    // Logic to update the certificates
    // Example: updateCertificatesAPI(userInfo.id, newCertificateData);
  };

  const addCertificate = async () => {
    setUploading(true); // Start upload loading
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow only images
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedFiles = result.assets; // Get selected files

      // Validate file types for JPEG, JPG, and PNG only
      const validFiles = selectedFiles.filter(
        (file) =>
          file.mimeType === "image/jpeg" ||
          file.mimeType === "image/jpg" ||
          file.mimeType === "image/png"
      );

      if (validFiles.length === 0) {
        alert("Please select only JPEG, JPG, or PNG files.");
        setUploading(false);
        return;
      }

      // Limit to one file
      if (validFiles.length > 1) {
        alert("You can only select one certificate at a time.");
        setUploading(false);
        return;
      }

      const file = validFiles[0]; // Get the single valid file
      const blob = await (await fetch(file.uri)).blob();
      const awspath = await getUserProfileUploadPath(id, token); // Ensure id and token are defined
      if (!awspath) {
        setUploading(false);
        return;
      }

      const response = await fetch(awspath.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.mimeType || "multipart/form-data",
        },
        body: blob,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const certificateData = {
        filename: file.fileName,
        mimetype: file.mimeType,
        destination: awspath.uploadURL.split("?")[0],
        path: awspath.uploadURL.split("?")[0],
        size: file.fileSize,
        userId: id,
      };

      try {
        const createResponse = await createCertificate(certificateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (createResponse.success) {
          // Handle success (e.g., update state, notify user)
          console.log("Certificate added successfully:", createResponse.data);
        }
      } catch (error) {
        console.error("Error uploading certificate:", error);
      }
    }
    setUploading(false); // End upload loading
  };

  const isProfileOwner = id === profileOwnerId; // Replace with your logic

  return (
    <View>
      <TouchableOpacity
        onPress={() => handelExpandDetailPress({ tobePressed: "contact" })}
        className="mt-2 py-1 rounded-md"
        style={styles.shadow}
      >
        <View className="flex-row  justify-between items-center">
          <Text className="font-interr text-lg"></Text>
          <Text className="font-interr text-base my-2 text-white-600">
            Contacts
          </Text>
          <Image
            source={expandContacts ? images.expandup : images.expand}
            resizeMode="contain"
            className="h-2 w-2 mr-4"
            tintColor="fff"
          />
        </View>
        {userInfo && expandContacts && (
          <View className="px-4">
            <View className="text-white-500 flex-row items-center justify-start">
              <View className="pr-4">
                <Text className="font-interr text-white-500 ">Email:</Text>
              </View>
              <View>
                <Text className="text-white-300 font-interr text-[12px]">
                  {userInfo.email ? userInfo.email : "No Email"}
                </Text>
              </View>
            </View>
            <View className="text-white-500 flex-row items-center justify-start">
              <View className="pr-4">
                <Text className="font-interr text-base text-white-500 ">
                  {" "}
                  Phone:
                </Text>
              </View>
              <View>
                <Text className="font-interr text-[12px] text-white-300">
                  {userInfo.phone}{" "}
                </Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handelExpandDetailPress({ tobePressed: "adress" })}
        className="mt-2 py-1 rounded-md"
        style={styles.shadow}
      >
        <View className="flex-row  justify-between items-center">
          <Text className="font-semibold text-lg"></Text>
          <Text className="font-interr text-base my-2 text-white-600">
            Adress
          </Text>
          <Image
            source={expandAdress ? images.expandup : images.expand}
            resizeMode="contain"
            className="h-2 w-2 mr-4"
            tintColor="fff"
          />
        </View>
        {userInfo && expandAdress && (
          <View className="px-4">
            <View className="text-white-500 flex-row items-center justify-center">
              <View>
                <View>
                  <Text className="font-light text-white-300">
                    <TouchableOpacity
                      onPress={handleNavigateToMap}
                      className="flex-row items-center  justify-center h-10 w-full"
                    >
                      <Text className="font-interr text-sm my-2 text-white-600 text-center">
                        {userInfo.UserAdressDetails[0].name},{" "}
                        {userInfo.UserAdressDetails[0].city},{" "}
                        {userInfo.UserAdressDetails[0].country}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={handleNavigateToMap}
                    className="flex-row items-center  justify-center h-10 w-full"
                  >
                    <Icon name="map-marker" size={30} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <View className="position-relative">
        <TouchableOpacity
          onPress={() =>
            handelExpandDetailPress({ tobePressed: "socialMedia" })
          }
          className="mt-2 py-1 rounded-md"
          style={styles.shadow}
        >
          <View className="flex-row justify-between items-center bg-black">
            <Text className="font-semibold text-lg"></Text>
            <Text className="font-interr text-base my-2 text-white-600">
              Social media
            </Text>
            <Image
              source={expandSocialMedia ? images.expandup : images.expand}
              resizeMode="contain"
              className="h-2 w-2 mr-4"
              tintColor="fff"
            />
          </View>
        </TouchableOpacity>

        {expandSocialMedia && (
          <View style={[styles.modalView]}>
            <Text>
              {userInfo.SocialMediaAccount
                ? null
                : "No Social Media Accounts found"}
            </Text>
            {userInfo.SocialMediaAccount && (
              <View>
                {userInfo.SocialMediaAccount.telegram && (
                  <TouchableOpacity
                    // style={styles.button}
                    className="my-2 bg-white-500 border-[1px] rounded-md border-white-500 px-[40%] py-[0px] "
                    onPress={() =>
                      handleSocialMediaRedirect(
                        userInfo.SocialMediaAccount.telegram
                      )
                    }
                  >
                    <Icon name="telegram" size={20} color="#0088cc" />
                  </TouchableOpacity>
                )}
                {userInfo.SocialMediaAccount.facebook && (
                  <TouchableOpacity
                    // style={styles.button}
                    style={styles.buttonList}
                    // className="my-2 bg-white-200 border-[1px] rounded-md px-[40%] py-[0px] "
                    onPress={() =>
                      handleSocialMediaRedirect(
                        userInfo.SocialMediaAccount.facebook
                      )
                    }
                  >
                    <Icon name="facebook" size={20} color="#3b5998" />
                  </TouchableOpacity>
                )}
                {userInfo.SocialMediaAccount.instagram && (
                  <TouchableOpacity
                    style={styles.buttonList}
                    // className="my-2 bg-white-200  rounded-md px-[40%] py-[0px] "
                    onPress={() =>
                      handleSocialMediaRedirect(
                        userInfo.SocialMediaAccount.instagram
                      )
                    }
                  >
                    <Icon name="instagram" size={20} color="#c32aa3" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => handelExpandDetailPress({ tobePressed: "productList" })}
        className="mt-2 py-1 rounded-md"
        style={expnadDetail ? styles.shadow : styles.expandStyle}
      >
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-lg"></Text>
          <Text className="font-semibold text-lg">
            Product and service list
          </Text>
          <Image
            source={images.expand}
            resizeMode="contain"
            className="h-2 w-2 mr-4"
            tintColor="fff"
          />
        </View>
        {userInfo && (
          <View>
            <Text className="font-light">{userInfo.productServiceList},</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handelExpandDetailPress({ tobePressed: "licence" })}
        className="mt-2 py-1 rounded-md"
        style={styles.shadow}
      >
        <View className="flex-row  justify-between items-center">
          <Text className="font-semibold text-lg"></Text>
          <Text className="font-semibold text-lg">
            {" "}
            License and certificate
          </Text>
          <Image
            source={images.expand}
            resizeMode="contain"
            className="h-2 w-2 mr-4"
            tintColor="fff"
          />
        </View>
        {userInfo && expandLicence && (
          <View>
            <Text className="font-light">update certificates</Text>
            <TouchableOpacity onPress={addCertificate}>
              <Icon name="edit" size={20} color="red" />
            </TouchableOpacity>
            {userInfo.LicenceAndCirtificates &&
              userInfo.LicenceAndCirtificates.length > 0 && (
                <View>
                  <Text className="font-bold">
                    Your Licenses and Certificates:
                  </Text>
                  {userInfo.LicenceAndCirtificates.map((certificate, index) => {
                    console.log(certificate); // Log the certificate object to inspect its structure
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectedFile(certificate); // Set the selected file
                          setModalVisible(true); // Open the modal
                        }}
                        style={{ marginVertical: 5 }}
                      >
                        <Text className="text-blue-600 underline">
                          {certificate.filename}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
          </View>
        )}
      </TouchableOpacity>

      {/* Modal for Viewing Certificates */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView className="bg-white-100 px-2">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between items-center h-[90vh] w-[98vw] py-4">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  margin: 2,
                }}
              >
                {selectedFile ? (
                  selectedFile.mimetype.startsWith("image/") ? (
                    <Image
                      source={{ uri: selectedFile.path }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="contain"
                    />
                  ) : (
                    <DocumentViewer
                      filePath={selectedFile.path}
                      onClose={() => setModalVisible(false)}
                    />
                  )
                ) : (
                  <Text>No file selected</Text> // Fallback message
                )}
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "blue" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.84,
    elevation: 4,
  },
  modalView: {
    zIndex: 40,
    width: "80%",
    marginHorizontal: "auto",
    paddingBottom: 20,
    position: "absolute",
    top: 40,
    left: "10%",
    right: "10%",
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 100,
  },
  button: {
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "40%",
    width: "80%",
    height: 26,
    marginTop: 5,
    paddingVertical: 5,
    backgroundColor: "#D4D5A4",
    shadowColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonList: {
    borderRadius: 6,
    backgroundColor: " rgba(166, 167, 70, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CompanyDetail;
