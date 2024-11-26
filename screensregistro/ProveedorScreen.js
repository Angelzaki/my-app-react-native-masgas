import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../my-app/firebase-config'; // Ajusta la ruta de importación
import { collection, doc, setDoc } from 'firebase/firestore'; // Funciones necesarias para Firestore
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
import { useNavigation } from '@react-navigation/native';

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
  const [password, setPassword] = useState(''); // Campo para la contraseña
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !nombreEmpresa ||
      !direccion ||
      !ruc ||
      !tipoServicio ||
      !descripcionServicio ||
      !experiencia ||
      !areaServicio ||
      !password
    ) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    setIsSubmitting(true);

    const auth = getAuth();

    try {
      // Registrar al proveedor en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'Proveedores', user.uid), {
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
        fechaRegistro: new Date().toISOString(),
      });

      Alert.alert('Éxito', 'Proveedor registrado correctamente. Un administrador revisará tu información.');

      // Reiniciar campos
      setNombre('');
      setApellido('');
      setEmail('');
      setTelefono('');
      setNombreEmpresa('');
      setDireccion('');
      setRuc('');
      setTipoServicio('');
      setDescripcionServicio('');
      setExperiencia('');
      setAreaServicio('');
      setPassword('');

      // Redirigir al Login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error al registrar proveedor:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el proveedor.');
    } finally {
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
      <TextInput placeholder="RUC" value={ruc} onChangeText={setRuc} keyboardType="numeric" style={styles.input} />
      <Picker selectedValue={tipoServicio} onValueChange={setTipoServicio} style={styles.picker}>
        <Picker.Item label="Selecciona el Tipo de Servicio" value="" />
        <Picker.Item label="Distribución de Gas" value="Distribución de Gas" />
        <Picker.Item label="Mantenimiento de Redes de Gas" value="Mantenimiento de Redes de Gas" />
      </Picker>
      <TextInput
        placeholder="Descripción del Servicio"
        value={descripcionServicio}
        onChangeText={setDescripcionServicio}
        multiline
        style={[styles.input, styles.textarea]}
      />
      <TextInput placeholder="Años de Experiencia" value={experiencia} onChangeText={setExperiencia} keyboardType="numeric" style={styles.input} />
      <TextInput
        placeholder="Área de Servicio (Ej: Lima Metropolitana, Callao)"
        value={areaServicio}
        onChangeText={setAreaServicio}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} style={[styles.button, { backgroundColor: isSubmitting ? '#ccc' : '#FF3D3D' }]}>
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
