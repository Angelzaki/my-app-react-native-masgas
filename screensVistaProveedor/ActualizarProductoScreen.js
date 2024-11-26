import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const ActualizarProductoScreen = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipoGas, setTipoGas] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener productos de Firestore
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Productos'));
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
  }, []);

  // Manejar selección de un producto
  const handleSelectProducto = (producto) => {
    setSelectedProducto(producto);
    setPrecio(producto.precio.toString());
    setCantidad(producto.cantidad.toString());
    setTipoGas(producto.tipoGas);
    setModalVisible(true);
  };

  // Guardar cambios en Firestore
  const handleGuardarCambios = async () => {
    if (!selectedProducto) return;

    try {
      const productoRef = doc(db, 'Productos', selectedProducto.id);
      await updateDoc(productoRef, {
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad, 10),
        tipoGas: tipoGas,
      });

      Alert.alert('Éxito', 'Producto actualizado correctamente.');

      // Actualizar lista de productos
      const updatedProductos = productos.map((prod) =>
        prod.id === selectedProducto.id
          ? { ...prod, precio: parseFloat(precio), cantidad: parseInt(cantidad, 10), tipoGas }
          : prod
      );
      setProductos(updatedProductos);

      setModalVisible(false);
      setSelectedProducto(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      Alert.alert('Error', 'No se pudo actualizar el producto.');
    }
  };

  const renderProducto = ({ item }) => (
    <TouchableOpacity style={styles.producto} onPress={() => handleSelectProducto(item)}>
      <Icon name="local-gas-station" size={40} color="#003366" style={styles.productIcon} />
      <View style={styles.productInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoDetalle}>Precio: s/. {item.precio}</Text>
        <Text style={styles.productoDetalle}>Stock: {item.cantidad}</Text>
        <Text style={styles.productoDetalle}>Tipo: {item.tipoGas}</Text>
      </View>
      <Icon name="edit" size={25} color="#E52D27" style={styles.editIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un producto para actualizar</Text>

      {/* Lista de productos */}
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
      />

      {/* Modal para editar producto */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="update" size={50} color="#E52D27" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Actualizar Producto</Text>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Gas"
              value={tipoGas}
              onChangeText={setTipoGas}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio por kg"
              keyboardType="numeric"
              value={precio}
              onChangeText={setPrecio}
            />
            <TextInput
              style={styles.input}
              placeholder="Disponibilidad en KG"
              keyboardType="numeric"
              value={cantidad}
              onChangeText={setCantidad}
            />
            <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lista: {
    marginTop: 10,
  },
  producto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  productIcon: {
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  productoDetalle: {
    fontSize: 14,
    color: '#555',
  },
  editIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#E52D27',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
});

export default ActualizarProductoScreen;
