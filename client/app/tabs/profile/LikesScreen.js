import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import axios from 'axios';

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hey there, champ! Ready to smash today's workout? 💪",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    try {
      const res = await axios.post(`http://localhost:8000/api/chat/groq`, {
        message: input,
      });

      const aiReply = res?.data?.response || "Let's keep grinding! 🔥";

      const aiMsg = {
        id: Date.now().toString() + '_ai',
        text: aiReply,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI error:', err);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text style={styles.messageText}>
        {item.text}
        </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask your gym buddy..."
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  chatArea: {
    padding: 10,
    paddingBottom: 80,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#1db954',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  aiMessage: {
    backgroundColor: '#2a2a2a',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 55,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 30,
    paddingHorizontal: 15,
    color: '#fff',
    height: 45,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#1db954',
    borderRadius: 30,
    padding: 10,
  },
  sendText: {
    fontSize: 18,
    color: '#fff',
  },
});

