import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const PerfilScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Agregar hook de navegación

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const docRef = doc(db, 'Proveedores', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const openWhatsApp = () => {
    if (userData?.telefono) {
      const whatsappURL = `whatsapp://send?phone=${userData.telefono}&text=Hola%20${userData.nombre}%2C%20queremos%20comunicarnos%20contigo%20desde%20MasGas.`;
      Linking.openURL(whatsappURL).catch(() => {
        Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo.');
      });
    } else {
      Alert.alert('Error', 'No hay un número de teléfono disponible.');
    }
  };

  const openMessenger = () => {
    const messengerURL = `https://m.me/${userData?.messengerId || 'MasGasPage'}`;
    Linking.openURL(messengerURL).catch(() => {
      Alert.alert('Error', 'Messenger no está instalado en este dispositivo.');
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E52D27" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Título */}
        <Text style={styles.title}>Lima Gas</Text>

        {/* Imagen de perfil */}
        <Image
          source={require('../images/capi.png')} // Imagen de perfil
          style={styles.image}
        />

        {/* Nombre */}
        <Text style={styles.name}>{userData?.nombre || 'Nombre no disponible'}</Text>

        {/* Información personal */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.text}>{userData?.apellido || 'No disponible'}</Text>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.text}>{userData?.telefono || 'No disponible'}</Text>
          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.text}>{userData?.email || 'No disponible'}</Text>
        </View>

        {/* Logo y botones alineados */}
        <Image
          source={require('../images/logo2.png')} // Logo de MasGas
          style={styles.logo}
        />

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Editar')} // Navegar a la pantalla de edición
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => navigation.navigate('Conectar')} // Navegar a la pantalla de conexión
          >
            <Text style={styles.buttonText}>Conectar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    color: '#003366',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 10,
  },
  text: {
    color: '#003366',
  },
  logo: {
    width: 120,
    height: 90,
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#E52D27',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PerfilScreen;
