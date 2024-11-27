import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function RegistroScreen() {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    // Navega a la pantalla correspondiente según el rol
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Logo en la parte superior */}
      <Image
        source={require('./images/logo2.png')} // Ruta del logo
        style={styles.logo}
      />
      
      {/* Botones para seleccionar el rol */}
      <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Proveedor')}>
        <Text style={styles.buttonText}>Soy Proveedor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNavigate('Usuario')}>
        <Text style={styles.buttonText}>Soy Usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo blanco
    padding: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FF3D3D', // Rojo similar al de la imagen
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

export default RegistroScreen;
