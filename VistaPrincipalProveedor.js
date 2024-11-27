import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth } from './firebase-config'; // Asegúrate de importar Firebase Auth
import { db } from './firebase-config'; // Asegúrate de importar correctamente tu configuración de Firebase

const VistaPrincipalProveedor = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMenuOptions, setShowMenuOptions] = useState(false);
  const navigation = useNavigation(); // Hook para navegación

  // Función para obtener los productos del proveedor logueado
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const user = auth.currentUser; // Obtener el usuario autenticado
        if (!user) {
          Alert.alert('Error', 'No se pudo obtener la información del usuario logueado.');
          return;
        }

        // Obtener productos específicos del proveedor logueado
        const querySnapshot = await getDocs(
          collection(db, `Proveedores/${user.uid}/Productos`)
        );
        const productosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosList);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        Alert.alert('Error', 'No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No se pudo obtener la información del usuario logueado.');
        return;
      }

      // Eliminar el producto de la colección del proveedor logueado
      await deleteDoc(doc(db, `Proveedores/${user.uid}/Productos`, id));
      setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
      Alert.alert('Éxito', 'Producto eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el producto.');
    }
  };

  const renderProducto = ({ item }) => (
    <View style={styles.producto}>
      <Image source={require('./images/gas.png')} style={styles.imagen} />
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>s/. {item.precio}</Text>
      <Text style={styles.stock}>Stock: {item.cantidad}</Text>
      <Text style={styles.tipoGas}>Tipo de Gas: {item.tipoGas}</Text>
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
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Rápido, seguro</Text>
          <Text style={styles.headerSubtitle}>y a tu puerta</Text>
        </View>
        <View style={styles.icons}>
          {/* Menú de usuario */}
          <TouchableOpacity onPress={() => setShowUserMenu(!showUserMenu)}>
            <Image
              source={require('./images/user.png')} // Ícono de usuario
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* Menú de opciones */}
          <TouchableOpacity onPress={() => setShowMenuOptions(!showMenuOptions)}>
            <Image
              source={require('./images/menu.png')} // Ícono de menú
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menú de usuario */}
      {showUserMenu && (
        <View style={styles.userMenu}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              setShowUserMenu(false);
              navigation.navigate('Perfil'); // Navegar a Perfil
            }}
          >
            <Text style={styles.menuOptionText}>● Perfil</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menú de opciones */}
      {showMenuOptions && (
        <View style={styles.menuOptions}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              setShowMenuOptions(false);
              navigation.navigate('ActualizarProducto'); // Navegar a Actualizar Productos
            }}
          >
            <Text style={styles.menuOptionText}>● Actualizar Productos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => {
              setShowMenuOptions(false);
              navigation.navigate('AgregarProducto'); // Navegar a Agregar Productos
            }}
          >
            <Text style={styles.menuOptionText}>● Agregar Productos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Banner */}
      <Image source={require('./images/banner-image.png')} style={styles.bannerImage} />

      {/* Lista de productos */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando productos...</Text>
      ) : productos.length > 0 ? (
        <FlatList
          data={productos}
          renderItem={renderProducto}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
        />
      ) : (
        <Text style={styles.emptyText}>No hay productos disponibles.</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366', // Fondo azul oscuro
  },
  header: {
    backgroundColor: '#E52D27', // Rojo del encabezado
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  userMenu: {
    position: 'absolute',
    top: 70,
    right: 50,
    backgroundColor: '#E52D27',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  menuOptions: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: '#E52D27',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  menuOption: {
    padding: 10,
  },
  menuOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  lista: {
    padding: 10,
  },
  producto: {
    backgroundColor: '#fff', // Fondo blanco para las tarjetas
    marginBottom: 15,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  imagen: {
    width: 150, // Ancho de la imagen
    height: 150, // Altura de la imagen
    marginBottom: 10,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  precio: {
    fontSize: 16,
    color: '#ff0000',
    marginVertical: 5,
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
  tipoGas: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: '#E52D27',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    height: 150,
    marginTop: 10,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default VistaPrincipalProveedor;
