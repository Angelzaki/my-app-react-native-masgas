import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
export default function FormularioRegistroProveedorMasGas() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ruc, setRuc] = useState('');
  const [tipoServicio, setTipoServicio] = useState('');
  const [descripcionServicio, setDescripcionServicio] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [areaServicio, setAreaServicio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!nombre || !apellido || !email || !telefono || !nombreEmpresa || !direccion || !ruc || !tipoServicio || !descripcionServicio || !experiencia || !areaServicio) {
      Alert.alert('Error', 'Por favor, completa todos los campo');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await firestore().collection('proveedores').add({
        nombre,
        apellido,
        email,
        telefono,
        nombreEmpresa,
        direccion,
        ruc,
        tipoServicio,
        descripcionServicio,
        experiencia,
        areaServicio,
      });
      Alert.alert('Éxito', 'Formulario enviado con éxito. Un administrador de MasGas revisará tu información.');
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al enviar el formulario');
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Proveedor - MasGas</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} style={styles.input} />
      <TextInput placeholder="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" style={styles.input} />
      <TextInput placeholder="Nombre de la Empresa" value={nombreEmpresa} onChangeText={setNombreEmpresa} style={styles.input} />
      <TextInput placeholder="Dirección" value={direccion} onChangeText={setDireccion} style={styles.input} />
      <TextInput placeholder="RUC" value={ruc} onChangeText={setRuc} style={styles.input} />
      
      <Text style={styles.label}>Tipo de Servicio</Text>
      <Picker selectedValue={tipoServicio} onValueChange={(itemValue) => setTipoServicio(itemValue)} style={styles.picker}>
        <Picker.Item label="Selecciona el tipo de servicio" value="" />
        <Picker.Item label="Instalación de Gas" value="instalacion" />
        <Picker.Item label="Mantenimiento de Sistemas de Gas" value="mantenimiento" />
        <Picker.Item label="Reparación de Fugas" value="reparacion" />
        <Picker.Item label="Revisión de Seguridad" value="revision" />
        <Picker.Item label="Distribución de Gas" value="distribucion" />
      </Picker>

      <TextInput
        placeholder="Descripción del Servicio"
        value={descripcionServicio}
        onChangeText={setDescripcionServicio}
        multiline
        style={[styles.input, styles.textarea]}
      />
      <TextInput placeholder="Años de Experiencia" value={experiencia} onChangeText={setExperiencia} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Área de Servicio (Ej: Lima Metropolitana, Callao)" value={areaServicio} onChangeText={setAreaServicio} style={styles.input} />
      
      <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} style={[styles.button, { backgroundColor: '#ff0000' }]}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar Registro a MasGas</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0462a3',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#231f20',
  },
  label: {
    fontSize: 16,
    color: '#231f20',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#231f20',
    borderWidth: 1,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
