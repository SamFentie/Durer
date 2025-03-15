import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, {useState} from "react";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { icons } from "../../constants";
import MainDemands from "../../components/demnads/MainDemands";
import moment from "moment";
import { SIZES, COLORS} from "../../constants/theme";

import images from "../../constants/images";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../../context/api/api";
import ImageCarousel from "../../components/profile/ProfileImages";
const sampleProfileData = {
  id: "sample-id",
  companyName: "Company name",
  bio: "Bio/slogan",
  productService: "Product or service",
  profilePictures:[
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
      "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
    ],
  stats: {
    following: "238",
    followers: "55.7K",
    rating: 4.5
  },
  contacts: {
    phone: "+251911223344",
    email: "company@example.com",
    website: "www.company.com"
  },
  address: {
    street: "Bole Road",
    city: "Addis Ababa",
    country: "Ethiopia"
  },
  socialMedia: {
    facebook: "company.facebook",
    twitter: "company.twitter",
    instagram: "company.instagram"
  },
  productServices: [
    "Product 1",
    "Service 1",
    "Product 2",
    "Service 2"
  ],
  licenses: [
    {
      name: "Business License",
      number: "LIC123456"
    },
    {
      name: "Trade Certificate",
      number: "CERT789012"
    }
  ],
  demands: [
    {
        status: false,
        id: 1,
        text_question: "I need drone camera for 4 days rent June 8- June 11",
        image_question: images.testimage,
        voice_question:
          "https://assets.mixkit.co/active_storage/sfx/995/995-preview.mp3",
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Clothing", "dgsahdsdsadbsdsdbscccc", "Designer"],
        is_answered: "#Designer #dgsahdsdsadbsdsdbscccc",
        user: "Siham Joo",
        user_profile: images.profile,
        number_of_intreactions: 3,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
      {
        status: true,
        id: 2,
        text_question:
          "I need a green Fancy dress for photo shoot. I need a expert designer to design the dress. I need it for May  0",
        image_question: images.shope,
        voice_question: null,
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Designer", "Designer", "Designer"],
        is_answered: "#Designer #clothing",
        user: "Amand Joo",
        user_profile: images.profile,
        number_of_intreactions: 126,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
      {
        status: true,
        id: 3,
        text_question:
          "I need a green Fancy dress for photo shoot. I need a expert designer to design the dress. I need it for May  0",
    
        image_question: null,
        voice_question:
          "https://assets.mixkit.co/active_storage/sfx/1714/1714-preview.mp3",
        further_question: [
          " how much is the price?",
          "how much is the price?",
          "how much is the price?",
        ],
        demand_category: ["Designer", "Designer", "Designer"],
        is_answered: "#Designer #clothing",
        user: "Siham Joo",
        user_profile: images.profile,
        number_of_intreactions: 67,
        createdAt: moment(new Date(), "YYYYMMDD").fromNow(),
      },
  ]
}; 

const PropertyCard = ({ title, icon, isExpanded, onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.propertyCard}
    activeOpacity={0.7}
  >
    <View style={styles.propertyHeader}>
      <View style={styles.headerLeft}>
        <Image source={icon} style={styles.cardIcon} resizeMode="contain" />
        <Text style={styles.propertyTitle}>{title}</Text>
      </View>
      <Image
        source={icons.expand}
        style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}
      />
    </View>
    {isExpanded && <View style={styles.propertyContent}>{children}</View>}
  </TouchableOpacity>
);

const Profile = () => {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState(null);
  const [userInformation,setUserInformation]=useState()
  const isFocused = useIsFocused();
  const getUserInfo = async () => {
    const userIn= await AsyncStorage.getItem("user_info").then(setUserInformation(getUserProfile(user["data"]["id"],user["data"]["token"])));
    
    console.log(userInformation["data"])
    return JSON.parse(userIn);
  };
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const userInfo=getUserInfo();
 
 
  const renderContactInfo = () => (
    <View style={styles.infoContent}>
      <View style={styles.infoRow}>
        <Image source={icons.phone} style={styles.infoIcon} />
        <Text style={styles.infoText}>{sampleProfileData.contacts.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Image source={icons.email} style={styles.infoIcon} />
        <Text style={styles.infoText}>{sampleProfileData.contacts.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Image source={icons.web} style={styles.infoIcon} />
        <Text style={styles.infoText}>
          {sampleProfileData.contacts.website}
        </Text>
      </View>
    </View>
  );

  const renderAddressInfo = () => (
    <View style={styles.infoContent}>
      <View style={styles.infoRow}>
        <Image source={icons.location} style={styles.infoIcon} />
        <View>
          <Text style={styles.infoText}>
            {sampleProfileData.address.street}
          </Text>
          <Text style={styles.infoText}>{sampleProfileData.address.city}</Text>
          <Text style={styles.infoText}>
            {sampleProfileData.address.country}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderSocialMedia = () => (
    <View style={styles.infoContent}>
      <View style={styles.socialIconsRow}>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={styles.socialMediaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Image
            source={require("../../assets/icons/twitter.png")}
            style={styles.socialMediaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Image
            source={require("../../assets/icons/instagram.png")}
            style={styles.socialMediaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Image
            source={require("../../assets/icons/linkedin.png")}
            style={styles.socialMediaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
          <Image
            source={require("../../assets/icons/youtube.png")}
            style={styles.socialMediaIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.socialDescriptions}>
        <View style={styles.infoRow}>
          <Image
            source={require("../../assets/icons/facebook.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            {sampleProfileData.socialMedia.facebook}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require("../../assets/icons/twitter.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            {sampleProfileData.socialMedia.twitter}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require("../../assets/icons/instagram.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            {sampleProfileData.socialMedia.instagram}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderProductServices = () => (
    <View style={styles.infoContent}>
      {sampleProfileData.productServices.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Image source={icons.product} style={styles.infoIcon} />
          <Text style={styles.infoText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  const renderLicenses = () => (
    <View style={styles.infoContent}>
      {sampleProfileData.licenses.map((license, index) => (
        <View key={index} style={styles.infoRow}>
          <Image source={icons.license} style={styles.infoIcon} />
          <View>
            <Text style={styles.infoText}>{license.name}</Text>
            <Text style={[styles.infoText, styles.infoSubtext]}>
              {license.number}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="bg-white-100 flex-1 mx-1 rounded-md">
     
     
      <MainDemands demands={sampleProfileData.demands} >
        {/* Shop Logo Section */}

        <View>
        <Text className="ext-lg font-interreb text-[20px] mb-[6px] mt-2 text-white-600 ml-4">Profile</Text>
        <ImageCarousel images={sampleProfileData.profilePictures}/>
        {/* Company Info Section */}
        <View className="mt-4">
          <Text className="text-lg font-bold">
            {sampleProfileData.companyName}
          </Text>
          <Text className="text-sm text-gray-500">{sampleProfileData.bio}</Text>
          <Text className="text-sm text-gray-500">
            {sampleProfileData.productService}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <View className="items-center">
              <Text className="text-sm text-gray-500">Following</Text>
              <Text className="font-bold">
                {sampleProfileData.stats.following}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Followers</Text>
              <Text className="font-bold">
                {sampleProfileData.stats.followers}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Rating</Text>
              <View className="flex-row">
                {[...Array(5)].map((_, i) => (
                  <Text
                    key={i}
                    style={{
                      color:
                        i < Math.floor(sampleProfileData.stats.rating)
                          ? "#FFD700"
                          : "#D3D3D3",
                    }}
                  >
                    ★
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View className="flex-row gap-2 mt-4">
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
            >
              <Text style={styles.actionButtonTextSecondary}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
            >
              <Text style={styles.actionButtonTextSecondary}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonIcon]}
              onPress={() => router.push("createProfileUsRegularUser")}
            >
             <Text style={styles.actionButtonTextSecondary}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Property Cards */}
        <View style={styles.propertyCardsContainer}>
          <PropertyCard
            title="Contact"
            icon={icons.phone}
            isExpanded={expandedSection === "contact"}
            onPress={() => toggleSection("contact")}
          >
            {renderContactInfo()}
          </PropertyCard>

          <PropertyCard
            title="Address"
            icon={icons.location}
            isExpanded={expandedSection === "address"}
            onPress={() => toggleSection("address")}
          >
            {renderAddressInfo()}
          </PropertyCard>

          <PropertyCard
            title="Social media"
            icon={icons.social}
            isExpanded={expandedSection === "social"}
            onPress={() => toggleSection("social")}
          >
            {renderSocialMedia()}
          </PropertyCard>

          <PropertyCard
            title="Product and service list"
            icon={icons.product}
            isExpanded={expandedSection === "products"}
            onPress={() => toggleSection("products")}
          >
            {renderProductServices()}
          </PropertyCard>

          <PropertyCard
            title="License and certificate"
            icon={icons.license}
            isExpanded={expandedSection === "licenses"}
            onPress={() => toggleSection("licenses")}
          >
            {renderLicenses()}
          </PropertyCard>
        </View>

        {/* Demands Section */}
        <View className="mt-4 mb-6">
          <View className="flex-row items-center mb-2">
            <Image
              source={icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Text className="ml-2 font-bold">Demands</Text>
          </View>
        </View>
        </View>
        </MainDemands>
    
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: "#F9F9FA",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },
  logoBackground: {
    backgroundColor: "#E8E8B0",
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
  },
  shopText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    tintColor: "#666",
  },
  sectionButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  propertyCardsContainer: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.sm,
  },
  propertyCard: {
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary.DEFAULT,
  },
  propertyTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },
  expandIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.text.secondary,
  },
  expandIconRotated: {
    transform: [{ rotate: "180deg" }],
  },
  propertyContent: {
    padding: 12,
    backgroundColor: "#fff",
  },
  infoContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary.DEFAULT,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
  },
  infoSubtext: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  actionButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary.DEFAULT,
    elevation: 0,
    shadowOpacity: 0,
  },
  actionButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonTextSecondary: {
    textAlign: "center",
    color: COLORS.primary.DEFAULT,
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtonIcon: {
    flex: 0,
    width: 40,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border.light,
    elevation: 0,
    shadowOpacity: 0,
  },
  actionButtonIconImage: {
    width: 20,
    height: 20,
    tintColor: COLORS.text.secondary,
  },
  socialIconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 8,
  },
  socialMediaButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  socialMediaIcon: {
    width: 32,
    height: 32,
  },
  socialDescriptions: {
    gap: 12,
  },
});
