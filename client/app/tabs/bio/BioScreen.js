import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo, AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "@/context/AuthContext";
import api from "../../../constants/api";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
const screenWidth = Dimensions.get("window").width;
const carouselHeight = screenWidth * (9 / 16);

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [profileImages, setProfileImages] = useState([]);
  const [bio, setBio] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadUserData = async () => {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
  
        if (decodedToken.userId) {
          await fetchProfileData(decodedToken.userId);
        }
      };
  
      loadUserData();
    }, [])
  );
  
  useEffect(() => {
    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
  };

  const fetchProfileData = async (id = userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api.API_URL}/api/user/profile/${id}`
      );
      const data = response?.data?.user;
      setUser(data);
      setProfileImages(data?.imageUrls || []);
      setBio(data?.bio || "");
      setWeight(data?.weight?.toString() || "");
      setAge(data?.age?.toString() || "");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveBio = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put(
        `${api.API_URL}/api/user/update-bio/${userId}`,
        {
          bio,
          weight: Number(weight),
          age: Number(age),
        }
      );
  
      if (response.status === 200) {
        alert("Profile updated successfully!");
        setBio(response.data.user.bio);
        fetchProfileData();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving the profile.");
    } finally {
      setIsSaving(false);
    }
  };

  
  const generateBio = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.get(
        `${api.API_URL}/api/user/generate-bio/${userId}`
      );
      const generatedBio =
        response?.data?.bio || "Generated bio not available.";
      setBio(generatedBio);
    } catch (error) {
      console.error("Error generating bio:", error);
      alert("Failed to generate a bio.");
    } finally {
      setIsGenerating(false);
    }
  };

  const pickImage = async () => {
    navigation.navigate("EditPhotosScreen", {
      currentImages: profileImages,
      userId: userId,
    });
  };

  const handleLogout = async () => {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: "auth/login" }] });
  };

  const goToEditInfo = () => {
    navigation.navigate("EditInfoScreen", { userId });
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item }} style={styles.carouselImage} />
    </View>
  );
  const setAdminRole = async () => {
    try {
      await AsyncStorage.setItem("role", "admin");
      alert("Role set to admin");
      window.location.reload();
    } catch (error) {
      console.error("Error setting role:", error);
    }
  };
  return (
    <View style={styles.mainContainer}>
       <Pressable style={styles.adminButton} onPress={setAdminRole}>
      <Ionicons name="swap-horizontal-outline" size={24} color="#DC143C" />
    </Pressable>

      <Pressable style={styles.editIconButton} onPress={goToEditInfo}>
        <MaterialIcons name="edit" size={28} color="#DC143C" />
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#DC143C" />
        ) : (
          <>
            <View style={styles.profileHeader}>
              <Pressable
                onPress={pickImage}
                style={styles.profileImageContainer}
              >
                <Image
                  source={{
                    uri: profileImages[0] || "https://via.placeholder.com/150",
                  }}
                  style={styles.profileImage}
                />
                <View style={styles.cameraIconContainer}>
                  <Entypo name="camera" size={18} color="white" />
                </View>
              </Pressable>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <View style={styles.bioSection}>
              <Text style={styles.bioLabel}>Bio:</Text>
              <View style={styles.bioInputContainer}>
                <TextInput
                  style={styles.bioInput}
                  value={bio}
                  onChangeText={(text) => setBio(text)}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#888"
                  multiline
                />
                <Pressable
                  style={styles.generateIconButton}
                  onPress={generateBio}
                  disabled={isGenerating}
                >
                  <AntDesign
                    name={isGenerating ? "loading1" : "sync"}
                    size={20}
                    color={isGenerating ? "#999" : "#DC143C"}
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Weight (kg):</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder="Enter your weight"
                keyboardType="numeric"
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Age:</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={(text) => setAge(text)}
                placeholder="Enter your age"
                keyboardType="numeric"
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.buttonRow}>
              <Pressable
                onPress={saveBio}
                style={[styles.actionButton, isSaving && styles.disabledButton]}
                disabled={isSaving}
              >
                <Text style={styles.actionButtonText}>
                  {isSaving ? "Saving..." : "Save Bio"}
                </Text>
              </Pressable>
              <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  editIconButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#fddede",
    borderRadius: 24,
    padding: 6,
    elevation: 3,
  },
  adminButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fddede",
    borderRadius: 24,
    padding: 6,
    elevation: 3,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: "#DC143C",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#DC143C",
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D3748",
    marginTop: 12,
  },
  userEmail: {
    fontSize: 15,
    color: "#718096",
    marginTop: 4,
  },
  bioSection: {
    width: "100%",
    marginBottom: 25,
  },
  bioLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: 8,
  },
  bioInputContainer: {
    position: "relative",
  },
  bioInput: {
    backgroundColor: "#fff5f5",
    borderRadius: 16,
    padding: 15,
    fontSize: 15,
    color: "#2D3748",
    textAlignVertical: "top",
    height: 110,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: "#fbb6b6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  generateIconButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  inputSection: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#2D3748",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff5f5",
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    color: "#2D3748",
    borderWidth: 1,
    borderColor: "#fbb6b6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
    gap: 12,
  },
  actionButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
    elevation: 3,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    flex: 1,
    alignItems: "center",
    elevation: 3,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
