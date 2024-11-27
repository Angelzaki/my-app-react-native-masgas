import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native"; // Para navegación
import { db } from "./firebase-config"; // Configuración de Firebase

const ProductosProveedores = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook de navegación

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const proveedoresSnapshot = await getDocs(collection(db, "Proveedores"));
        const proveedoresList = [];

        for (const docProveedor of proveedoresSnapshot.docs) {
          const proveedorId = docProveedor.id;
          const proveedorData = docProveedor.data();

          // Obtener productos
          const productosSnapshot = await getDocs(
            collection(db, `Proveedores/${proveedorId}/Productos`)
          );
          const productos = productosSnapshot.docs.map((docProducto) => ({
            id: docProducto.id,
            ...docProducto.data(),
          }));

          // Obtener calificaciones
          const calificacionesSnapshot = await getDocs(
            collection(db, `Proveedores/${proveedorId}/calificaciones`)
          );
          const calificaciones = calificacionesSnapshot.docs.map((docCalificacion) =>
            docCalificacion.data()
          );

          const ratingPromedio =
            calificaciones.reduce((sum, cal) => sum + cal.calificacion, 0) /
              (calificaciones.length || 1) || 0;

          // Obtener conexiones (WhatsApp y Messenger)
          const conexionesRef = doc(db, `Proveedores/${proveedorId}/conexiones/datos`);
          const conexionesSnap = await getDoc(conexionesRef);
          const conexiones = conexionesSnap.exists() ? conexionesSnap.data() : {};

          proveedoresList.push({
            id: proveedorId,
            nombre: proveedorData.nombre || "Sin nombre",
            direccion: proveedorData.direccion || "Sin dirección",
            productos,
            calificaciones,
            rating: ratingPromedio.toFixed(1),
            conexiones, // Incluye WhatsApp y Messenger
          });
        }

        setData(proveedoresList);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleComprarEnLinea = (proveedor, producto) => {
    if (!proveedor.conexiones?.whatsapp) {
      Alert.alert("Error", "Este proveedor no tiene un número de WhatsApp configurado.");
      return;
    }

    const mensaje = `Hola ${proveedor.nombre}, estoy interesado en comprar el producto "${producto.nombre}".`;
    const url = `https://wa.me/${proveedor.conexiones.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "No se pudo abrir WhatsApp. Verifica que esté instalado.")
    );
  };

  const handleAbrirMessenger = (proveedor) => {
    if (!proveedor.conexiones?.messenger) {
      Alert.alert("Error", "Este proveedor no tiene un enlace de Messenger configurado.");
      return;
    }

    Linking.openURL(proveedor.conexiones.messenger).catch(() =>
      Alert.alert("Error", "No se pudo abrir Messenger. Verifica que esté instalado.")
    );
  };

  const handleComprarPorAplicativo = (producto, proveedor) => {
    //Alert.alert("Funcionalidad en desarrollo", "La navegación a `Detail` está desactivada temporalmente.");
    // Descomentar esta línea si decides habilitar `Detail`
    
    navigation.navigate("Detail", {
      proveedorNombre: proveedor.nombre,
      productoNombre: producto.nombre,
      productoPrecio: producto.precio,
      productoCantidad: producto.cantidad,
      productoTipoGas: producto.tipoGas,
      productoCapacidad: producto.capacidad,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
        <Text style={styles.loadingText}>Cargando proveedores...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((proveedor) => (
        <View key={proveedor.id} style={styles.proveedorCard}>
          <View style={styles.proveedorInfo}>
            <Image
              source={require("./images/logo4.png")}
              style={styles.proveedorImage}
            />
            <View style={styles.proveedorDetails}>
              <Text style={styles.proveedorName}>{proveedor.nombre}</Text>
              <Text style={styles.proveedorAddress}>{proveedor.direccion}</Text>
              <Text style={styles.proveedorRating}>
                {`Rating: ${proveedor.rating} ⭐`}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Productos:</Text>
          {proveedor.productos.map((producto) => (
            <View key={producto.id} style={styles.productCard}>
              <Image
                source={require("./images/balon1.png")}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{producto.nombre}</Text>
                <Text style={styles.productDetails}>
                  Peso: {producto.peso || "N/A"}
                </Text>
                <Text style={styles.productPrice}>
                  Precio: s/. {producto.precio || "N/A"}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => handleComprarEnLinea(proveedor, producto)}
                >
                  <Icon name="shopping-cart" size={20} color="#FFF" />
                  <Text style={styles.buyButtonText}>En Línea</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.appButton}
                  onPress={() => handleComprarPorAplicativo(producto, proveedor)}
                >
                  <Icon name="apps" size={20} color="#FFF" />
                  <Text style={styles.appButtonText}>Por Aplicativo</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Calificaciones:</Text>
          {Array.isArray(proveedor.calificaciones) &&
          proveedor.calificaciones.length > 0 ? (
            proveedor.calificaciones.map((calificacion, index) => (
              <View key={index} style={styles.ratingCard}>
                <Text style={styles.ratingText}>
                  {`⭐ ${calificacion.calificacion} - ${calificacion.comentario}`}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noRatingText}>No hay calificaciones aún.</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  proveedorCard: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  proveedorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  proveedorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  proveedorDetails: {
    flex: 1,
  },
  proveedorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  proveedorAddress: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  proveedorRating: {
    fontSize: 14,
    color: "#FF8800",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E52D27",
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28A745",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 5,
  },
  appButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5722",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  appButtonText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 5,
  },
  ratingCard: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
  },
  noRatingText: {
    fontSize: 14,
    color: "#999",
  },
});

export default ProductosProveedores;
