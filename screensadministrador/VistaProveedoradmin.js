import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Modal, Alert } from 'react-native';
import { db } from '../../my-app/firebase-config'; // Ajusta la ruta de importación de firebase-config.js
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Funciones necesarias para Firestore

function VistaProveedorAdmin() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [proveedores, setProveedores] = useState([]); // Array para almacenar los proveedores

  // Cargar los proveedores desde Firestore al inicio
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        // Obtener todos los documentos de la colección "Proveedores"
        const proveedoresRef = collection(db, 'Proveedores');
        const querySnapshot = await getDocs(proveedoresRef);
        const proveedoresList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProveedores(proveedoresList);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
        Alert.alert('Error', 'No se pudieron cargar los proveedores.');
      }
    };

    fetchProveedores(); // Llamada a la función de carga de datos
  }, []); // El hook se ejecuta solo una vez al montar el componente

  const handleShowDetails = (proveedor) => {
    setSelectedProveedor(proveedor);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProveedor(null);
  };

  const handleDeleteProveedor = async (id) => {
    try {
      // Referencia al documento en Firestore
      const proveedorDocRef = doc(db, 'Proveedores', id);

      // Eliminar el documento de la colección 'Proveedores'
      await deleteDoc(proveedorDocRef);

      Alert.alert('Éxito', 'Proveedor eliminado correctamente.');

      // Actualizar la lista de proveedores después de la eliminación
      setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el proveedor.');
    }
  };

  const handleValidateProveedor = (proveedor) => {
    Alert.alert('Proveedor aprobado', `El proveedor ${proveedor.nombre} ha sido aprobado.`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo y título */}
      <Image source={require('../images/logo2.png')} style={styles.logo} />
      <Text style={styles.title}>Revisión de Proveedores - MasGas</Text>

      {/* Lista de proveedores */}
      {proveedores.map((proveedor) => (
        <View key={proveedor.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.proveedorName}>{proveedor.nombre}</Text>
            <TouchableOpacity onPress={() => handleShowDetails(proveedor)}>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.rucText}>RUC: {proveedor.ruc}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProveedor(proveedor.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.validateButton} onPress={() => handleValidateProveedor(proveedor)}>
              <Text style={styles.validateText}>Validar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal para mostrar detalles */}
      {selectedProveedor && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Detalles del Proveedor</Text>
              <Text>Nombre: {selectedProveedor.nombre}</Text>
              <Text>RUC: {selectedProveedor.ruc}</Text>
              <Text>Dirección: {selectedProveedor.direccion}</Text>
              <Text>Teléfono: {selectedProveedor.telefono}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1C3D72',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  proveedorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoIcon: {
    fontSize: 20,
    color: '#1C3D72',
  },
  rucText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3D3D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  validateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1C3D72',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VistaProveedorAdmin;