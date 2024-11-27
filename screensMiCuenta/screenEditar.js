import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenEditar = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [nombres, setNombres] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  const handleSave = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    console.log('Guardando cambios...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comience a Editar</Text>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="account-circle" size={80} color="#FF3D3D" />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre - Empresa"
          value={nombreEmpresa}
          onChangeText={setNombreEmpresa}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombres y Apellidos"
          value={nombres}
          onChangeText={setNombres}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="DNI"
            value={dni}
            onChangeText={setDni}
          />
          <MaterialCommunityIcons name="check-circle" size={20} color="#FF3D3D" />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
          <MaterialCommunityIcons name="check-circle" size={20} color="#FF3D3D" />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
          />
          <MaterialCommunityIcons name="check-circle" size={20} color="#FF3D3D" />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5E5E5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C3D72',
    textAlign: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScreenEditar;
