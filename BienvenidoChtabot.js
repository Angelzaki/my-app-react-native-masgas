// Dentro de BienvenidoChabto.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BienvenidoChabto = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Hola, soy MasGas!</Text>
      <Text style={styles.subtitle}>¿En qué puedo ayudarte hoy?</Text>
      
      {/* Imagen del robot en el centro */}
      <Image source={require('./images/robot.jpeg')} style={styles.robotImage} />

      <TouchableOpacity onPress={() => navigation.navigate('Chatbot')} style={styles.startButton}>
        <Text style={styles.startButtonText}>¡Quiero saber más!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco para una apariencia limpia
  },
  title: {
    fontSize: 30,
    color: '#333', // Color gris oscuro para el texto
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666', // Color gris suave para el subtítulo
    marginBottom: 20,
    textAlign: 'center',
  },
  robotImage: {
    width: 150,
    height: 150,
    marginBottom: 30, // Espacio entre la imagen y el botón
  },
  startButton: {
    backgroundColor: 'red', // Color rojo para el botón
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Sombra en Android
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BienvenidoChabto;
