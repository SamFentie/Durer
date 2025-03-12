import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { images } from "../constants";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { activateAccount, registerUserUsACompany } from "../context/api/api";
import { useDispatch } from "react-redux";
import { registerUsanIndividualUser } from "../context/api/api";
import { getCategories } from "../context/api/categories";
import {
  logInUserAction,
  registerUserPhaseOne,
} from "../context/slices/authSlices";
import Dropdown from "../components/DropDown";
import countriy from "../context/countriy";
import DateTimePicker from "../components/DateTimePickers";
import DateTimePickers from "../components/DateTimePickers";
import PhoneNumberByCountry from "../components/PhoneNumberByCountry";
import Gender from "../components/Gender";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryDropDown from "../components/CategoryDropDown";
import UploadCertficatesField from "../components/UploadCertficatesField";
import UserLocationPicker from "../components/userLocation/userLocation";
import SocialMediaLinksInput from "../components/socialMediaLinks/SocialMediaLinksInPut";

const CreateProfileUsaCompany = () => {
  const dispatch = useDispatch();
  const retrievePhaseOneData = async () => {
    const email = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).email;
    const user_name = JSON.parse(
      await AsyncStorage.getItem("user_reg_phase_one")
    ).user_name;
    const userData = { email, user_name };

    return userData;
  };
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [productCategory, setProductCategory] = useState("Furniture");
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState();
  const [adress_details, setAdress_details] = useState();
  const [city, setCity] = useState("");
  const [subCategories, setSubCategories] = useState("");
  const [productAndServiceList, setProductAndServiceList] = useState();
  const [sampleWorks, setSampleWorks] = useState("");
  const [certficates, setCertficates] = useState("");
  const [country, setCountry] = useState("Ethiopia");

  const [formError, setFormError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isSocialMediaLinkModalVisible, setIsSocialMediaLinkModalVisible] =
    useState(false);
  const [address_name, setAddress_name] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");

  const handelCompanyNameChange = (e) => {
    setCompanyName(e);
  };
  const handelPhoneNumberChange = (e) => {
    setPhoneNumber(e);
  };
  const handelBioChange = (e) => {
    setBio(e);
  };
  const handelSocialMediaLinkChange = (e) => {
    setSocialMediaLinks(e);
  };

  const handelProductCategoryyChange = (e) => {
    setProductCategory(e);
  };
  const handelCountryChange = (e) => {
    setCountry(e);
  };
  const handelCityChange = (e) => {
    setCity(e);
  };
  const handelAdressDetail = (e) => {
    setAdress_details(e);
  };
  const handelSubCategories = (e) => {
    setSubCategories(e);
  };
  const handelCertficates = (e) => {
    setCertficates(e);
  };
  const handelProductAndServiceList = (e) => {
    setProductAndServiceList(e);
  };
  const handelSampleWorks = (e) => {
    setSampleWorks(e);
  };

  const submit = async (e) => {
    const phaseoneData = await retrievePhaseOneData();
    const logFormData = (datas) => {
      const entries = datas.entries();
      const result = {};
      let next;
      let pair;
      while ((next = entries.next()) && next.done === false) {
        pair = next.value;
        result[pair[0]] = pair[1];
      }
      // console.log(result);
    };
    let email = phaseoneData.email;
    let user_name = phaseoneData.user_name;
    const formData = {
      first_name: companyName,
      phone: phoneNumber,
      address_country: country,
      address_city: city,
      address_detail: adress_details,
      is_company: true,
      bio,
      email,
      user_name,
      // licence_certficate,
      category_name: productCategory,
      sub_category_name: subCategories,
      social_medias: socialMediaLinks,
      product_and_services: productAndServiceList,
    };
    if (!companyName || !phoneNumber || !productCategory || !country || !city) {
      setFormError("All fields are required!");
      Alert.alert("error", "All Fields Required!");
    }

    await registerUserUsACompany(formData).then((res) => {
      setIsSubmitting(false);
      if (res.err) {
        setServerError(res.err);
        setFormError(null);
      } else {
        logInUserAction(res.message);
        setServerError(null);
        setFormError(null);
        router.push("/discovery");
      }
    });
    // dispatch(registerUserPhaseOne(fromData));
  };
  const closeSocialMediaVisisbility = () => {
    setIsSocialMediaLinkModalVisible(false);
  };

  const setAdressDetailesFromTheMap = (data) => {
    console.log(data);
    setAddress_name(data.name);
    setIsLocationModalVisible(false);
    setAdress_details(data);
  };

  const addSocialMediaLinks = (data) => {
    if (data.twitter) setSocialMediaLink(data.twitter);
    if (data.facebook) setSocialMediaLink(data.facebook);
    if (data.telegram) setSocialMediaLink(data.telegram);
    if (data.instagram) setSocialMediaLink(data.instagram);
    if (data.tiktok) setSocialMediaLink(data.tiktok);
    console.log(data);
    setIsSocialMediaLinkModalVisible(false);
    setSocialMediaLinks(data);
  };

  useEffect(() => {
    getCategories().then((res) => {
      console.log(res.data);
      setProductCategoryList(res.data);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white-100 h-full pb-8">
      <ScrollView>
        <View className="w-full justify-center items-center h-full  min-h-[85vh] px-4">
          <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ">
            Create your profile
          </Text>
          <Image
            source={images.followShop}
            resizeMode="contain"
            className="w-32 h-32 items-center justify-center mt-1"
          />

          <FormField
            title="Company name"
            placeholder="Enter your company name"
            value={companyName}
            handleChangeText={handelCompanyNameChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <CategoryDropDown
            title="Product or service"
            items={productCategoryList && productCategoryList}
            placeholder="Ethiopia"
            value={productCategory}
            handleChangeText={handelProductCategoryyChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            title="Bio/Slogan"
            placeholder="Enter your bio"
            value={bio}
            handleChangeText={handelBioChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <PhoneNumberByCountry
            items={countriy && countriy}
            title="Phone number"
            placeholder="-000-00-0000"
            value={phoneNumber}
            handleChangeText={handelPhoneNumberChange}
            otherStyles="mt-7"
            keyboardType="text"
          />

          <View className="space-y-2 justify-center items-start w-full mt-7">
            <Text className="text-base text-white-600 font-interr">
              Social media links
            </Text>
            <TouchableOpacity
              onPress={() => setIsSocialMediaLinkModalVisible(true)}
            >
              <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
                <TextInput
                  className="flex-1 font-interr text-[12px] text-white-950 underline"
                  value={socialMediaLink}
                  placeholder="https://www.instagram.com/waklarainc"
                  placeholderTextColor={`${2 > 1 ? "#93d1ff" : "#7b7b8b"}`}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isSocialMediaLinkModalVisible}
            onRequestClose={() => {
              setIsSocialMediaLinkModalVisible(false);
            }}
          >
            <SocialMediaLinksInput
              addSocialMediaLinks={addSocialMediaLinks}
              closeSocialMediaVisisbility={closeSocialMediaVisisbility}
            />
          </Modal>
          <Dropdown
            title="Country"
            items={countriy && countriy}
            placeholder="Ethiopia"
            value={country}
            handleChangeText={handelCountryChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <FormField
            value={city}
            title="City/Province"
            placeholder="Bole,Adiss Ababa"
            handleChangeText={handelCityChange}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <View className="space-y-2 justify-center items-start w-full mt-7">
            <Text className="text-base text-white-600 font-interr">
              Adress details
            </Text>
            <TouchableOpacity onPress={() => setIsLocationModalVisible(true)}>
              <View className="border-[1px] border-white-500 w-full h-[44px] px-4 rounded-lg flex-row items-center">
                <TextInput
                  className="flex-1 font-interr text-[12px] text-white-950 underline"
                  value={address_name}
                  placeholder="Bole, snap plaza"
                  placeholderTextColor={`${2 > 1 ? "#93d1ff" : "#7b7b8b"}`}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={isLocationModalVisible}
            onRequestClose={() => {
              setIsLocationModalVisible(false);
            }}
          >
            <UserLocationPicker
              adressDetailesFromTheMap={setAdressDetailesFromTheMap}
            />
            <View className="flex-row items-center w-1/2 mx-auto my-2 ">
              <TouchableOpacity
                className=" bg-white-500 w-full h-[32px] px-4 rounded-lg flex-row "
                onPress={() => setIsLocationModalVisible(false)}
              >
                <Text className="font-interr text-base mx-auto text-white-100">
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <FormField
            value={productAndServiceList}
            title="Product and service list"
            placeholder="Write your product and service list"
            handleChangeText={handelProductAndServiceList}
            otherStyles="mt-7"
            keyboardType="text"
          />

          <FormField
            value={subCategories}
            title="Specify your catagory"
            placeholder="#wholesale #retailer #used #handmade #organic"
            handleChangeText={handelSubCategories}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <UploadCertficatesField
            value={certficates}
            title="License and Certﬁcate"
            placeholder="Add your nessesary doc"
            handleChangeText={handelCertficates}
            otherStyles="mt-7"
            keyboardType="text"
          />
          <UploadCertficatesField
            value={sampleWorks}
            title="Sample works"
            placeholder="Add your sample works"
            handleChangeText={handelSampleWorks}
            otherStyles="mt-7"
            keyboardType="text"
          />
          {serverError && <Text className="white-200">{serverError}</Text>}
          {formError && <Text className="white-200">{formError}</Text>}

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

export default CreateProfileUsaCompany;
