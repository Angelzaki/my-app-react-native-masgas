import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const predefinedFlows = {
  inicio: {
    message: "¡Hola! Soy el asistente virtual de MasGas. ¿En qué puedo ayudarte hoy?",
    options: [
      { text: "¿Qué es MasGas?", next: "que_es" },
      { text: "¿Cómo pedir gas?", next: "como_pedir" },
      { text: "Contactar soporte", next: "contactar_soporte" },
    ],
  },
  que_es: {
    message: "MasGas conecta distribuidores de gas con clientes. ¿Quieres saber más?",
    options: [
      { text: "¿Dónde opera?", next: "donde_opera" },
      { text: "Volver al inicio", next: "inicio" },
    ],
  },
  como_pedir: {
    message: "Puedes pedir gas seleccionando un distribuidor en nuestra app. ¿Necesitas ayuda con algo más?",
    options: [
      { text: "¿Qué tipos de gas ofrecen?", next: "tipos_gas" },
      { text: "Volver al inicio", next: "inicio" },
    ],
  },
  contactar_soporte: {
    message: null, // No mostrará mensaje porque abre el formulario
    options: [],
  },
  donde_opera: {
    message: "Actualmente operamos en Lima y otras ciudades principales.",
    options: [{ text: "Volver al inicio", next: "inicio" }],
  },
  tipos_gas: {
    message: "Ofrecemos Gas L.P y Gas Natural en presentaciones de 5kg, 10kg y 15kg.",
    options: [{ text: "Volver al inicio", next: "inicio" }],
  },
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: predefinedFlows.inicio.message, options: predefinedFlows.inicio.options },
  ]);
  const [loading, setLoading] = useState(false);
  const [isSupportFormVisible, setSupportFormVisible] = useState(false);
  const [name, setName] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [ticketNumber, setTicketNumber] = useState(null);

  // Guardar interacción en Firestore
  const saveInteraction = async (interaction) => {
    try {
      await addDoc(collection(db, 'Interacciones'), interaction);
    } catch (error) {
      console.error("Error al guardar interacción:", error);
    }
  };

  const handleOptionSelect = async (option) => {
    const nextFlow = predefinedFlows[option.next];

    if (option.next === "contactar_soporte") {
      setSupportFormVisible(true); // Muestra el formulario de soporte
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: option.text },
      { sender: 'bot', text: nextFlow.message, options: nextFlow.options },
    ]);

    await saveInteraction({
      userMessage: option.text,
      botResponse: nextFlow.message,
      timestamp: new Date(),
    });
  };

  const submitSupportRequest = async () => {
    if (!name.trim() || !issueDescription.trim() || !contactInfo.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const ticket = Math.floor(1000 + Math.random() * 9000);

      await addDoc(collection(db, 'SolicitudesSoporte'), {
        name,
        issueDescription,
        contactInfo,
        ticket,
        timestamp: new Date(),
      });

      setTicketNumber(ticket);
      setName('');
      setIssueDescription('');
      setContactInfo('');
    } catch (error) {
      console.error('Error al enviar la solicitud de soporte:', error);
      Alert.alert('Error', 'Hubo un problema al enviar tu solicitud.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot Asistente</Text>

      {!isSupportFormVisible ? (
        <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
          {messages.map((msg, index) => (
            <View key={index} style={styles.messageWrapper}>
              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'user' ? styles.userMessage : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>

              {msg.options?.length > 0 && (
                <View style={styles.optionsContainer}>
                  {msg.options.map((option, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionButton}
                      onPress={() => handleOptionSelect(option)}
                    >
                      <Text style={styles.optionText}>{option.text}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          {loading && <ActivityIndicator size="small" color="#FF0000" />}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.formContainer}>
          {!ticketNumber ? (
            <>
              <Text style={styles.infoText}>
                Si el chatbot no pudo resolver tu consulta, puedes solicitar ayuda de un agente humano.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Tu Nombre"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción del Problema"
                value={issueDescription}
                onChangeText={setIssueDescription}
                multiline
              />
              <TextInput
                style={styles.input}
                placeholder="Información de Contacto (Email o Teléfono)"
                value={contactInfo}
                onChangeText={setContactInfo}
              />

              <TouchableOpacity style={styles.submitButton} onPress={submitSupportRequest}>
                <Text style={styles.submitButtonText}>Solicitar Soporte Humano</Text>
              </TouchableOpacity>

              <Text style={styles.noteText}>
                Nuestro equipo de soporte está disponible de lunes a viernes, de 9:00 a 18:00.
              </Text>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                🎉 Soporte solicitado con éxito 🎉
              </Text>
              <Text style={styles.successDetails}>
                Un agente se pondrá en contacto contigo pronto.
              </Text>
              <Text style={styles.ticketText}>Tu número de ticket es: #{ticketNumber}</Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSupportFormVisible(false);
                  setTicketNumber(null);
                }}
              >
                <Text style={styles.resetButtonText}>Volver al Chat</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#003366',
    color: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  chatContent: {
    paddingBottom: 20,
  },
  messageWrapper: {
    marginVertical: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#FFDDC1',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#D3E3FC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 5,
  },
  optionButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  optionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    textAlign: 'center',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28A745',
    textAlign: 'center',
    marginBottom: 10,
  },
  successDetails: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  ticketText: {
    fontSize: 18,
    color: '#003366',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chatbot;
