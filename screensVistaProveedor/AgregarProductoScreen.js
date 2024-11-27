import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { auth } from '../firebase-config'; // Suponiendo que usas Firebase Auth

const AgregarProductoScreen = () => {
  const [proveedor, setProveedor] = useState(null); // Datos del proveedor logueado
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipoGas, setTipoGas] = useState('Normal');
  const [capacidad, setCapacidad] = useState('5KG');
  const [productos, setProductos] = useState([]);

  // Obtener el proveedor logueado al cargar la pantalla
  useEffect(() => {
    const fetchProveedorLogueado = async () => {
      try {
        const user = auth.currentUser; // Obtener el usuario logueado
        if (user) {
          const proveedorRef = doc(db, 'Proveedores', user.uid); // Suponiendo que el UID del usuario está relacionado con el proveedor
          const proveedorSnap = await getDoc(proveedorRef);

          if (proveedorSnap.exists()) {
            setProveedor({ id: proveedorSnap.id, ...proveedorSnap.data() });
          } else {
            Alert.alert('Error', 'No se encontró información del proveedor logueado.');
          }
        } else {
          Alert.alert('Error', 'No hay un usuario autenticado.');
        }
      } catch (error) {
        console.error('Error al obtener el proveedor logueado:', error);
        Alert.alert('Error', 'No se pudo cargar la información del proveedor.');
      }
    };

    fetchProveedorLogueado();
  }, []);

  // Obtener productos del proveedor logueado
  useEffect(() => {
    const fetchProductos = async () => {
      if (!proveedor) return;
      try {
        const querySnapshot = await getDocs(
          collection(db, `Proveedores/${proveedor.id}/Productos`)
        );
        const productosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosList);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, [proveedor]);

  const agregarProducto = async () => {
    if (!proveedor || !nombre || !precio || !cantidad) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const producto = {
        nombre,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10),
        tipoGas,
        capacidad,
      };
      await addDoc(collection(db, `Proveedores/${proveedor.id}/Productos`), producto);
      Alert.alert('Éxito', 'Producto agregado correctamente.');
      setNombre('');
      setPrecio('');
      setCantidad('');
      setTipoGas('Normal');
      setCapacidad('5KG');
      setProductos((prevProductos) => [...prevProductos, producto]); // Actualiza la lista localmente
    } catch (error) {
      console.error('Error al agregar producto:', error);
      Alert.alert('Error', 'No se pudo agregar el producto.');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, `Proveedores/${proveedor.id}/Productos`, id));
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      Alert.alert('Éxito', 'Producto eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      Alert.alert('Error', 'No se pudo eliminar el producto.');
    }
  };

  const renderProducto = ({ item }) => (
    <View style={styles.producto}>
      <View style={styles.productInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoDetalle}>Precio: s/. {item.precio}</Text>
        <Text style={styles.productoDetalle}>Stock: {item.cantidad}</Text>
        <Text style={styles.productoDetalle}>Tipo: {item.tipoGas}</Text>
        <Text style={styles.productoDetalle}>Capacidad: {item.capacidad}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            'Confirmación',
            `¿Estás seguro de que deseas eliminar "${item.nombre}"?`,
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: () => eliminarProducto(item.id) },
            ]
          )
        }
      >
        <Icon name="delete" size={25} color="#E52D27" />
      </TouchableOpacity>
    </View>
  );

  if (!proveedor) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando proveedor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <Text style={styles.subtitle}>Proveedor: {proveedor.nombre}</Text>

      {/* Formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Selección de Tipo de Gas */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            tipoGas === 'Normal' && styles.optionButtonSelected,
          ]}
          onPress={() => setTipoGas('Normal')}
        >
          <Text style={styles.optionText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            tipoGas === 'Envasado' && styles.optionButtonSelected,
          ]}
          onPress={() => setTipoGas('Envasado')}
        >
          <Text style={styles.optionText}>Envasado</Text>
        </TouchableOpacity>
      </View>

      {/* Selección de Capacidad */}
      <View style={styles.optionsContainer}>
        {['5KG', '10KG', '15KG'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              capacidad === option && styles.optionButtonSelected,
            ]}
            onPress={() => setCapacidad(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />
      <TouchableOpacity style={styles.button} onPress={agregarProducto}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Productos</Text>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#003366',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#E52D27',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E52D27',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    marginTop: 10,
  },
  producto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productoDetalle: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    padding: 5,
  },
});

export default AgregarProductoScreen;
