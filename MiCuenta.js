import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MyAccountScreen = () => {
  const navigation = useNavigation();

  const openWhatsApp = () => {
    const phoneNumber = "987654321"; // Número de teléfono de WhatsApp sin espacios
    const url = `whatsapp://send?phone=${phoneNumber}`;
    
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "WhatsApp no está instalado en tu dispositivo")
    );
  };

  const openMessenger = () => {
    const messengerUserId = "angel.salazar"; // Nombre de usuario o ID de Messenger
    const url = `fb-messenger://user-thread/${messengerUserId}`;
    
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Messenger no está instalado en tu dispositivo")
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Angel</Text>
        <Image
          source={require('./images/ZAKI.png')} // Imagen de perfil
          style={styles.profileImage}
        />
        <Text style={styles.providerName}>Makanaky la realeza</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoLabel}>DNI:</Text>
        <Text style={styles.infoText}>12345678</Text>

        <Text style={styles.infoLabel}>Teléfono:</Text>
        <Text style={styles.infoText}>987-654-321</Text>

        <Text style={styles.infoLabel}>Correo electrónico:</Text>
        <Text style={styles.infoText}>angel.salazar@gmail.com</Text>
      </View>

      <View style={styles.actionSection}>
        <Image
          source={require('./images/logo2.png')} // Logo de MasGas
          style={styles.logo}
        />
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('screenEditar')}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <View style={styles.connectButtons}>
          <TouchableOpacity style={styles.connectButton} onPress={openWhatsApp}>
            <Icon name="whatsapp" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectButton} onPress={openMessenger}>
            <MaterialCommunityIcons name="facebook-messenger" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.connectButton} onPress={() => navigation.navigate('screenConectar')}>
            <Text style={styles.connectButtonText}>Conectar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    backgroundColor: '#1C3D72',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
    marginBottom: 10,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C3D72',
  },
  infoSection: {
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  actionSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    marginHorizontal: 5,
    backgroundColor: '#FF3D3D',
    borderRadius: 5,
    padding: 10,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyAccountScreen;
