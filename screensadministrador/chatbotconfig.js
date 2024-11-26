import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AdminPanel = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [editedResponse, setEditedResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [newResponse, setNewResponse] = useState('');

  // Fetch respuestas predefinidas y historial
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsesSnapshot = await getDocs(collection(db, 'Respuestas'));
        const responsesList = responsesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResponses(responsesList);

        const historySnapshot = await getDocs(collection(db, 'HistorialCambios'));
        const historyList = historySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(historyList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Editar respuestas existentes
  const handleEditResponse = (response) => {
    setSelectedResponse(response);
    setEditedResponse(response.response);
  };

  const saveResponse = async () => {
    if (!selectedResponse || !editedResponse.trim()) {
      Alert.alert('Error', 'Debe seleccionar y editar una respuesta válida.');
      return;
    }

    try {
      const docRef = doc(db, 'Respuestas', selectedResponse.id);
      await updateDoc(docRef, {
        response: editedResponse,
        lastUpdated: new Date(),
      });

      // Guardar el cambio en el historial
      await addDoc(collection(db, 'HistorialCambios'), {
        trigger: selectedResponse.trigger,
        oldResponse: selectedResponse.response,
        newResponse: editedResponse,
        timestamp: new Date(),
        adminUser: 'admin123', // Cambiar si tienes autenticación
      });

      Alert.alert('Éxito', 'La respuesta se actualizó correctamente.');
      setResponses((prev) =>
        prev.map((res) =>
          res.id === selectedResponse.id ? { ...res, response: editedResponse } : res
        )
      );
      setSelectedResponse(null);
      setEditedResponse('');
    } catch (error) {
      console.error('Error updating response:', error);
      Alert.alert('Error', 'Hubo un problema actualizando la respuesta.');
    }
  };

  // Agregar un nuevo trigger
  const addNewTrigger = async () => {
    if (!newTrigger.trim() || !newResponse.trim()) {
      Alert.alert('Error', 'Debe completar todos los campos.');
      return;
    }

    try {
      const newDoc = await addDoc(collection(db, 'Respuestas'), {
        trigger: newTrigger,
        response: newResponse,
        options: [], // Inicialmente sin opciones
        lastUpdated: new Date(),
      });

      Alert.alert('Éxito', 'Nuevo trigger agregado correctamente.');
      setResponses((prev) => [
        ...prev,
        { id: newDoc.id, trigger: newTrigger, response: newResponse, options: [] },
      ]);
      setNewTrigger('');
      setNewResponse('');
    } catch (error) {
      console.error('Error adding new trigger:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el nuevo trigger.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración del Chatbot</Text>

      {/* Sección para agregar nuevos triggers */}
      <View style={styles.addTriggerContainer}>
        <Text style={styles.sectionTitle}>Agregar Nuevo Trigger</Text>
        <TextInput
          style={styles.input}
          placeholder="Trigger (palabra clave)"
          value={newTrigger}
          onChangeText={setNewTrigger}
        />
        <TextInput
          style={styles.input}
          placeholder="Respuesta"
          value={newResponse}
          onChangeText={setNewResponse}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewTrigger}>
          <Text style={styles.addButtonText}>
            <MaterialIcons name="add-circle" size={20} color="white" /> Agregar Trigger
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sección para editar respuestas existentes */}
      <ScrollView style={styles.responsesContainer}>
        <Text style={styles.sectionTitle}>Respuestas Existentes</Text>
        {responses.map((response) => (
          <TouchableOpacity
            key={response.id}
            style={styles.responseItem}
            onPress={() => handleEditResponse(response)}
          >
            <Text style={styles.triggerText}>
              <MaterialIcons name="bolt" size={18} color="#333" /> Trigger: {response.trigger}
            </Text>
            <Text style={styles.responseText}>{response.response}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedResponse && (
        <View style={styles.editContainer}>
          <Text style={styles.sectionTitle}>Editar Respuesta</Text>
          <TextInput
            style={styles.input}
            value={editedResponse}
            onChangeText={setEditedResponse}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveResponse}>
            <Text style={styles.saveButtonText}>
              <MaterialIcons name="save" size={20} color="white" /> Guardar Cambios
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sección del historial de cambios */}
      <ScrollView style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Historial de Cambios</Text>
        {history.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.historyText}>
              <MaterialIcons name="history" size={18} color="#333" /> <Text style={{ fontWeight: 'bold' }}>Trigger:</Text> {item.trigger}
            </Text>
            <Text style={styles.historyText}>
              <Text style={{ fontWeight: 'bold' }}>Anterior:</Text> {item.oldResponse}
            </Text>
            <Text style={styles.historyText}>
              <Text style={{ fontWeight: 'bold' }}>Actual:</Text> {item.newResponse}
            </Text>
            <Text style={styles.historyTimestamp}>
              Fecha: {new Date(item.timestamp.toDate()).toLocaleString()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#003366',
    color: '#FFFFFF',
  },
  addTriggerContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  addButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  responsesContainer: {
    padding: 10,
  },
  responseItem: {
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  triggerText: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  responseText: {
    color: '#666',
  },
  historyContainer: {
    padding: 15,
  },
  historyItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  historyTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AdminPanel;
