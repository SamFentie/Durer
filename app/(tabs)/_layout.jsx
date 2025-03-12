import { View, Text, Image, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import { Tabs, Redirect, useNavigation, useRoute, router } from "expo-router";
import { icons, images } from "../../constants";
import { getUserInfo } from "../../utils/user";
import LogoutButton from "../../components/LogoutButton";

const TabIcon = ({ icon, color, name, focused }) => {
  const navigation = useNavigation();

  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-[24px] h-[24px]"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-regular"} text-xs`}
        style={{ color: "#96A0AA" }}
      >
        {name}
      </Text>
    </View>
  );
};
const TabsLayout = () => {
  const navigation = useNavigation();
  const handelProfilePress = async () => {
     const userId = await getUserInfo().then((info) => info.id);
     console.log("-----------------------------------------")
     console.log(userId)
    navigation.navigate("profile", { userId: userId });
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#A6A746",
          tabBarInactiveTintColor: "#D4D5A4",
          tabBarStyle: {
            backgroundColor: "#F9F9FA",
            borderTopWidth: 1,
            borderTopColor: "#F9F9FA",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="discovery"
          options={{
            title: "Discovery",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={images.search}
                color={color}
                name="Discovery"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="demands"
          options={{
            title: "Demands",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={images.demands}
                color={color}
                name="Demands"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="request"
          options={{
            title: "Request",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={images.request}
                color={color}
                name="Request"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="interaction"
          options={{
            title: "Interaction",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={images.intraction}
                color={color}
                name="Interaction"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={images.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
            tabBarButton: (props) => (
              <Pressable {...props} onPress={handelProfilePress} />
            ),
          }}
        />



      </Tabs>
    </>
  );
};

export default TabsLayout;
