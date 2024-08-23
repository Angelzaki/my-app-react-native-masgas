// Chatbot.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { db } from './firebase-config'; // Importar la configuración de Firebase
import { collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: message,
          createdAt: new Date().getTime()
        });
        setMessage('');
      } catch (error) {
        console.error("Error enviando mensaje: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./images/logo2.png')} style={styles.logo} />
        <Text style={styles.headerText}>ChatBot</Text>
        <Text style={styles.headerText}>Online</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.isBot ? styles.botMessageContainer : styles.userMessageContainer}>
            <Text style={item.isBot ? styles.botMessageText : styles.userMessageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  logo: {
    width: 130,
    height: 130,
    marginRight: 0,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF0000',
    borderRadius: 15,
    marginVertical: 5,
    padding: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1d1d1',
    borderRadius: 15,
    marginVertical: 5,
    padding: 10,
    maxWidth: '80%',
  },
  botMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  userMessageText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FF0000',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chatbot;

