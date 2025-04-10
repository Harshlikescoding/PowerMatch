import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explore from "./Explore";
import BioScreen from "./bio/BioScreen";
import ProfileScreen from "./profile/LikesScreen";
import MapScreen from "./maps/MapScreen";
import ChatScreen from "./chat/ChatScreen";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import AdminScreen from "./admin/AdminScreen";

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  const { isLoading, token } = useContext(AuthContext);
  const tokenn = localStorage.getItem("role");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          elevation: 5,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          height: 50, // Reduced height
          borderTopWidth: 0, // Remove the default top border
          paddingBottom: 5, // Adjust padding to reduce empty space
          paddingTop: 5, // Add slight padding on top for balance
          ...styles.shadow,
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize = focused ? 28 : 24;
          let iconColor = focused ? "#e32f45" : "#748c94";

          if (route.name === "Explore") {
            iconName = focused ? "heart-circle" : "heart-circle-outline";
            return (
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            );
          } else if (route.name === "Bio") {
            iconName = "user";
            return (
              <FontAwesome name={iconName} size={iconSize} color={iconColor} />
            );
          } else if (route.name === "Admin") {
            iconName = "man";
            return (
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            );
          } else if (route.name === "Maps") {
              iconName = "map";
              return (
                <FontAwesome name={iconName} size={iconSize} color={iconColor} />
              );
      
          } else if (route.name === "Profile") {
            iconName = "heart-multiple-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={iconSize}
                color={iconColor}
              />
            );
          } else if (route.name === "Chat") {
            iconName = "message-circle";
            return (
              <Feather name={iconName} size={iconSize} color={iconColor} />
            );
          }
        },
      })}
    >

      <Tab.Screen name="Maps" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Bio" component={BioScreen} />
      {tokenn=="admin" && (
        <Tab.Screen name="Admin" component={AdminScreen} />
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
