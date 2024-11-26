import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const ConectarServiciosScreen = () => {
  const [connectedServices, setConnectedServices] = useState({
    whatsapp: null,
    messenger: null,
  });
  const [selectedService, setSelectedService] = useState(null);
  const [serviceData, setServiceData] = useState('');
  const db = getFirestore();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchConnections = async () => {
      if (!currentUser) return;

      try {
        const conexionesRef = doc(db, `Proveedores/${currentUser.uid}/conexiones/datos`);
        const conexionesSnapshot = await getDoc(conexionesRef);

        if (conexionesSnapshot.exists()) {
          setConnectedServices(conexionesSnapshot.data());
        }
      } catch (error) {
        console.error('Error al cargar las conexiones:', error);
      }
    };

    fetchConnections();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) {
      Alert.alert('Error', 'Debes iniciar sesión para conectar un servicio.');
      return;
    }

    if (!serviceData) {
      Alert.alert('Error', 'Por favor ingresa un valor válido.');
      return;
    }

    try {
      const conexionesRef = doc(db, `Proveedores/${currentUser.uid}/conexiones/datos`);

      await setDoc(
        conexionesRef,
        { [selectedService]: serviceData },
        { merge: true }
      );

      setConnectedServices((prev) => ({
        ...prev,
        [selectedService]: serviceData,
      }));

      Alert.alert(
        'Éxito',
        `${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)} conectado correctamente.`
      );
      setSelectedService(null);
      setServiceData('');
    } catch (error) {
      console.error('Error al guardar conexión en Firestore:', error);
      Alert.alert('Error', 'Hubo un problema al guardar los datos de conexión.');
    }
  };

  const handleTest = (service) => {
    const data = connectedServices[service];

    if (!data) {
      Alert.alert('Error', 'No hay información conectada para este servicio.');
      return;
    }

    if (service === 'whatsapp') {
      const whatsappURL = `https://wa.me/${data.replace('+', '')}`;
      Linking.openURL(whatsappURL).catch(() =>
        Alert.alert('Error', 'No se pudo abrir WhatsApp.')
      );
    } else if (service === 'messenger') {
      Linking.openURL(data).catch(() =>
        Alert.alert('Error', 'No se pudo abrir Messenger.')
      );
    }
  };

  if (selectedService) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {connectedServices[selectedService]
            ? `Editar ${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}`
            : `Conectar ${selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}`}
        </Text>
        <Text style={styles.subtitle}>
          {selectedService === 'whatsapp'
            ? 'Ingresa tu número de WhatsApp:'
            : 'Ingresa el enlace de tu página de Messenger:'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={
            selectedService === 'whatsapp' ? '+51' : 'Ej: https://m.me/tu-pagina'
          }
          value={serviceData}
          onChangeText={setServiceData}
          keyboardType={selectedService === 'whatsapp' ? 'phone-pad' : 'default'}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {connectedServices[selectedService] ? 'Actualizar' : 'Conectar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: '#555', marginTop: 10 }]}
          onPress={() => {
            setSelectedService(null);
            setServiceData('');
          }}
        >
          <Text style={styles.saveButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comunicación</Text>
      <Text style={styles.subtitle}>
        Conecta o edita tu cuenta de servicios de mensajería
      </Text>

      {/* WhatsApp */}
      <View style={styles.serviceCard}>
        <Image source={require('../images/wha.jpeg')} style={styles.serviceIcon} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>WhatsApp</Text>
          <Text style={styles.serviceRecommendation}>Recomendado</Text>
          <Text style={styles.serviceDescription}>
            Los clientes podrán hacer pedidos mediante WhatsApp.
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => {
              setSelectedService('whatsapp');
              setServiceData(connectedServices.whatsapp || '+51'); // Prefijo por defecto
            }}
          >
            <Text style={styles.connectButtonText}>
              {connectedServices.whatsapp ? 'Editar' : 'Conectar'}
            </Text>
          </TouchableOpacity>
          {connectedServices.whatsapp && (
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => handleTest('whatsapp')}
            >
              <Text style={styles.connectButtonText}>Probar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Messenger */}
      <View style={styles.serviceCard}>
        <Image source={require('../images/me.jpeg')} style={styles.serviceIcon} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>Messenger</Text>
          <Text style={styles.serviceRecommendation}>Recomendado</Text>
          <Text style={styles.serviceDescription}>
            Los clientes podrán hacer pedidos mediante Messenger.
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.connectButton}
            onPress={() => {
              setSelectedService('messenger');
              setServiceData(connectedServices.messenger || '');
            }}
          >
            <Text style={styles.connectButtonText}>
              {connectedServices.messenger ? 'Editar' : 'Conectar'}
            </Text>
          </TouchableOpacity>
          {connectedServices.messenger && (
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => handleTest('messenger')}
            >
              <Text style={styles.connectButtonText}>Probar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Image source={require('../images/logo2.png')} style={styles.footerLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  serviceRecommendation: {
    fontSize: 14,
    color: '#E52D27',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  connectButton: {
    backgroundColor: '#E52D27',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  testButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerLogo: {
    width: 120,
    height: 90,
    alignSelf: 'center',
    marginTop: 30,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#E52D27',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConectarServiciosScreen;
