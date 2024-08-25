import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const MyAccountScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <View style={styles.header}>
        <Image
          source={require('./images/banner-image.png')}// Imagen de fondo
          style={styles.backgroundImage}
        />
        <View style={styles.profileContainer}>
          <Image
            source={require('./images/account-icon.png')} // Imagen de perfil
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Angel Salazar</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Información del Usuario */}
      <View style={styles.userInfoSection}>
        <Text style={styles.userInfoText}>Correo Electrónico: angel.salazar@gmail.com</Text>
        <Text style={styles.userInfoText}>Teléfono: +51 962626272</Text>
        <Text style={styles.userInfoText}>Dirección Principal: Av. SG 123</Text>
      </View>

      {/* Opciones de Cuenta */}
      <View style={styles.optionsSection}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Historial de Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Administrar Direcciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Configuración y Soporte */}
      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Soporte al Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Configuraciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
          <Text style={styles.settingButtonText}>Términos y Condiciones</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'red', // Un color rojo tomate para el encabezado
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileName: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 10,
  },
  editProfileButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  optionsSection: {
    padding: 20,
  },
  optionButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsSection: {
    padding: 20,
  },
  settingButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  settingButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
