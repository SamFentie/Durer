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

import { SIZES, COLORS} from "../../constants/theme";



import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../../context/api/api";
import ImageCarousel from "../../components/profile/ProfileImages";
import sampleProfileData from "../../sampleUserProfile"

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
        <Text style={styles.infoText}>{sampleProfileData[0].contacts.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Image source={icons.email} style={styles.infoIcon} />
        <Text style={styles.infoText}>{sampleProfileData[0].contacts.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Image source={icons.web} style={styles.infoIcon} />
        <Text style={styles.infoText}>
          {sampleProfileData[0].contacts.website}
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
            {sampleProfileData[0].address.street}
          </Text>
          <Text style={styles.infoText}>{sampleProfileData[0].address.city}</Text>
          <Text style={styles.infoText}>
            {sampleProfileData[0].address.country}
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
            {sampleProfileData[0].socialMedia.facebook}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require("../../assets/icons/twitter.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            {sampleProfileData[0].socialMedia.twitter}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require("../../assets/icons/instagram.png")}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>
            {sampleProfileData[0].socialMedia.instagram}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderProductServices = () => (
    <View style={styles.infoContent}>
      {sampleProfileData[0].productServices.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <Image source={icons.product} style={styles.infoIcon} />
          <Text style={styles.infoText}>{item}</Text>
        </View>
      ))}
    </View>
  );

  const renderLicenses = () => (
    <View style={styles.infoContent}>
      {sampleProfileData[0].licenses.map((license, index) => (
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
    <SafeAreaView className="flex-1 mx-7 rounded-md">
     
     
      <MainDemands demands={sampleProfileData[0].demands} >
        {/* Shop Logo Section */}

        <View>
       
        <ImageCarousel images={sampleProfileData[0].profilePictures}/>
        {/* Company Info Section */}
        <View className="mt-4">
          <Text className="text-lg font-bold">
            {sampleProfileData[0].companyName}
          </Text>
          <Text className="text-sm text-gray-500">{sampleProfileData[0].bio}</Text>
          <Text className="text-sm text-gray-500">
            {sampleProfileData[0].productService}
          </Text>

          <View className="flex-row justify-between items-center mt-4">
            <View className="items-center">
              <Text className="text-sm text-gray-500">Following</Text>
              <Text className="font-bold">
                {sampleProfileData[0].stats.following}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Followers</Text>
              <Text className="font-bold">
                {sampleProfileData[0].stats.followers}
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
                        i < Math.floor(sampleProfileData[0].stats.rating)
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
              onPress={() => router.push(`editprofile/${sampleProfileData[0].id}`)}
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
        <View className="mt-4 mb-6 w-full items-center">
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
