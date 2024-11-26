import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const screenConectar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Comunicación</Text>
      <Text style={styles.subHeaderText}>
        Conecta tu cuenta a servicios de mensajería
      </Text>

      {/* WhatsApp */}
      <View style={styles.serviceContainer}>
        <Image
          source={require('../images/logo2.png')} // Asegúrate de tener este icono en la carpeta correcta
          style={styles.serviceIcon}
        />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>WhatsApp</Text>
          <Text style={styles.serviceSubtitle}>Recomendado</Text>
          <Text style={styles.serviceDescription}>
            Los clientes podrán hacer pedidos mediante WhatsApp. Puedes recibir notificaciones en la aplicación o por mensaje.
          </Text>
        </View>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Conectado</Text>
        </TouchableOpacity>
      </View>

      {/* Messenger */}
      <View style={styles.serviceContainer}>
        <Image
          source={require('../images/logo2.png')} // Asegúrate de tener este icono en la carpeta correcta
          style={styles.serviceIcon}
        />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceTitle}>Messenger</Text>
          <Text style={styles.serviceSubtitle}>Recomendado</Text>
          <Text style={styles.serviceDescription}>
            Los clientes podrán hacer pedidos mediante Messenger. Puedes recibir notificaciones en la aplicación o por mensaje.
          </Text>
        </View>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Conectado</Text>
        </TouchableOpacity>
      </View>

      {/* Logo de MasGas */}
      <Image
        source={require('../images/logo2.png')} // Asegúrate de tener el logo en la carpeta correcta
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C3D72',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3D72',
  },
  serviceSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
  connectButton: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default screenConectar;
