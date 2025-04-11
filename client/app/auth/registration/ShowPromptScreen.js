import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { SlideAnimation, ModalContent, BottomModal } from "react-native-modals";
import { useNavigation } from "@react-navigation/native";


const ShowPromptScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const [option, setOption] = useState("About me");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const promptCategories = [
    {
      id: "0",
      name: "Gym Motivation",
      questions: [
        { id: "10", question: "What motivates me to hit the gym?" },
        { id: "11", question: "My favorite workout quote" },
        { id: "12", question: "The best advice I’ve received about fitness" },
        { id: "13", question: "How I stay consistent with workouts" },
        { id: "14", question: "My ultimate fitness goal" },
        { id: "15", question: "A personal fitness achievement I'm proud of" },
        { id: "16", question: "What I love about working out" },
      ],
    },
    {
      id: "1",
      name: "Workout Preferences",
      questions: [
        { id: "17", question: "My go-to workout routine" },
        { id: "18", question: "Cardio or weightlifting – my preference" },
        { id: "19", question: "My ideal workout partner is someone who..." },
        { id: "20", question: "The best time of day for my workouts" },
        { id: "21", question: "My favorite exercise or workout" },
        { id: "22", question: "How I push through tough workout days" },
        { id: "23", question: "One fitness challenge I want to try" },
      ],
    },
    {
      id: "2",
      name: "Healthy Living",
      questions: [
        { id: "24", question: "My favorite healthy meal or snack" },
        { id: "25", question: "How I recover after a tough workout" },
        { id: "26", question: "My top tip for staying hydrated" },
        { id: "27", question: "The biggest change fitness has brought to my life" },
        { id: "28", question: "My approach to balancing fitness and rest" },
        { id: "29", question: "One fitness myth I used to believe" },
      ],
    },
  ];
  const openModal = (item) => {
    setModalVisible(true);
    setQuestion(item?.question);
  };

  const addPrompt = () => {
    if (!answer.trim()) {
      Alert.alert("Error", "Please provide an answer.");
      return;
    }

    if (prompts.length < 3) {
      const newPrompt = { question, answer };
      setPrompts([...prompts, newPrompt]);
      setQuestion("");
      setAnswer("");
      setModalVisible(false);
    } else {
      Alert.alert("Limit Reached", "You can only select up to 3 prompts.");
    }
  };

  const removePrompt = (index) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(updatedPrompts);
  };

  const proceedToNextScreen = () => {
    if (prompts.length > 0) {
      navigation.navigate("PromptScreen", { prompts });
    } else {
      Alert.alert("Error", "Please select at least one prompt to proceed.");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.viewAllText}>View all</Text>
          <Text style={styles.titleText}>Prompts</Text>
          <Entypo name="cross" size={22} color="black" />
        </View>

        <View style={styles.categoryContainer}>
          {promptCategories.map((item) => (
            <Pressable
              key={item.id}
              style={[
                styles.categoryButton,
                option === item.name && styles.activeCategoryButton,
              ]}
              onPress={() => setOption(item.name)}
            >
              <Text
                style={[
                  styles.categoryText,
                  option === item.name && styles.activeCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView style={styles.promptList}>
          {promptCategories.map((category) =>
            category.name === option
              ? category.questions.map((questionItem) => (
                  <Pressable
                    key={questionItem.id}
                    onPress={() => openModal(questionItem)}
                    style={styles.promptItem}
                  >
                    <Text style={styles.promptText}>
                      {questionItem.question}
                    </Text>
                  </Pressable>
                ))
              : null
          )}
        </ScrollView>

        <View style={styles.selectedPromptsContainer}>
          <Text style={styles.selectedPromptsTitle}>Selected Prompts:</Text>
          {prompts.map((item, index) => (
            <View key={index} style={styles.selectedPrompt}>
              <Text style={styles.selectedPromptText}>
                {item.question}: {item.answer}
              </Text>
              <Pressable onPress={() => removePrompt(index)}>
                <Entypo name="cross" size={20} color="red" />
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable style={styles.proceedButton} onPress={proceedToNextScreen}>
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </Pressable>
      </SafeAreaView>

      <BottomModal
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        <ModalContent style={styles.modalContent}>
        <ModalContent style={{ padding: 0, height: 300 }}>
  <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.modalTitle}>Answer your question</Text>
      <Text style={styles.modalQuestion}>{question}</Text>

      <TextInput
        value={answer}
        onChangeText={setAnswer}
        style={styles.textInput}
        placeholder="Enter Your Answer"
        placeholderTextColor="#aaa"
        editable={true} // 👈 ensure this is set
        multiline={true} // optional
      />

      <TouchableOpacity style={styles.addButton} onPress={addPrompt}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView>
</ModalContent>

</ModalContent>

      </BottomModal>
    </>
  );
};

export default ShowPromptScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#581845",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#581845",
  },
  categoryContainer: {
    flexDirection: "row",
    margin: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: "#581845",
  },
  categoryText: {
    textAlign: "center",
    color: "black",
  },
  activeCategoryText: {
    color: "white",
  },
  promptList: {
    marginTop: 20,
    marginHorizontal: 12,
  },
  promptItem: {
    marginVertical: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  promptText: {
    fontSize: 15,
    fontWeight: "500",
  },
  selectedPromptsContainer: {
    marginTop: 30,
    paddingHorizontal: 12,
  },
  selectedPromptsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedPrompt: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  selectedPromptText: {
    fontSize: 15,
    fontWeight: "500",
  },
  proceedButton: {
    backgroundColor: "#581845",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    margin: 12,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContent: {
    width: "100%",
    height: 280,
    padding: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },
  modalQuestion: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  textInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
  },
  addButton: {
    backgroundColor: "#581845",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
