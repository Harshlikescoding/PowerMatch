import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { AntDesign, Entypo } from "@expo/vector-icons";
import constants from "../../../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [applyPreferences, setApplyPreferences] = useState(false);
  // Fetch user profiles from API
  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  };

    useEffect(() => {
      fetchUser();
    }, []);

  useEffect(() => {
    if (userId) {
      const getAuth = async () => {
        try {
          const res = await axios.get(
            `${constants.API_URL}/api/user/profile/${userId}`
          );
          setAuth(res?.data?.user);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      getAuth();
    }
  }, [userId]);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const url = `${constants.API_URL}/api/user/profiles/`;
      const params = {
        userId: userId,
        applyPreferences: applyPreferences ? "true" : "false",  
      };
      const res = await axios.get(url, { params });
      setUsers(res?.data?.matches || []);
      console.log("User profiles fetched:", res?.data?.matches);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [userId, applyPreferences]);

  // Handle Approve User
  const approveUser = (userId) => {
    console.log(`User ${userId} Approved ✅`);
    alert(`User ${userId} Approved`);
  };

  // Handle Block User
  const blockUser = (userId) => {
    console.log(`User ${userId} Blocked ❌`);
    alert(`User ${userId} Blocked`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Approval</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#DC143C" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* User Profile Image */}
              <Image
                source={{ uri: item.imageUrls[0] || "https://via.placeholder.com/100" }}
                style={styles.profileImage}
              />
              
              {/* User Details */}
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.userLocation}>{item.province}, {item.district}</Text>
                <Text style={styles.userAge}>Age: {item.dateOfBirth}</Text>
                <Text style={styles.userGender}>Gender: {item.gender}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <Pressable style={styles.approveButton} onPress={() => approveUser(item.userId)}>
                  <AntDesign name="checkcircle" size={24} color="white" />
                </Pressable>
                <Pressable style={styles.blockButton} onPress={() => blockUser(item.userId)}>
                  <Entypo name="block" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#DC143C",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userLocation: {
    fontSize: 14,
    color: "#666",
  },
  userAge: {
    fontSize: 14,
    color: "#666",
  },
  userGender: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  approveButton: {
    backgroundColor: "#28A745",
    padding: 8,
    borderRadius: 20,
  },
  blockButton: {
    backgroundColor: "#DC143C",
    padding: 8,
    borderRadius: 20,
  },
});
