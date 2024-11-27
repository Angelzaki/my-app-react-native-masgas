import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function AdministradorScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleNavigateToProveedores = () => {
    navigation.navigate('VistaProveedorAdmin');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Image
        source={require('../images/logo2.png')}
        style={styles.logo}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ChatbotConfig')} // Agrega la navegación
      >
        <Text style={styles.buttonText}>
          Chatbot Configuración</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calificacion')} // Agrega la navegación
      >
        <Text style={styles.buttonText}>
        Calificacion de Proveedor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reporte')} // Agrega la navegación
      >
        <Text style={styles.buttonText}>
        Reporte de Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreaNotifi')} // Agrega la navegación
      >
        <Text style={styles.buttonText}>
        Creacion de Notificaciones</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToProveedores}>
        <Text style={styles.buttonText}>Registro Proveedores</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logoutButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF3D3D',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF3D3D',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdministradorScreen;
