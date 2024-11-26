import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase-config"; // Asegúrate de importar correctamente tu configuración de Firebase

const Producto = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Cargar pedidos desde Firebase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "pagos"), orderBy("fecha", "desc")); // Consulta a Firebase
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc, index) => ({
          id: doc.id,
          ...doc.data(),
          number: `#${String(index + 1).padStart(6, "0")}`, // Generar número de pedido
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.loadingText}>Cargando pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Pedidos</Text>
        <Icon name="search" size={24} color="#FFF" style={styles.searchIcon} />
      </View>

      {/* Lista de Pedidos */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            {/* Encabezado del pedido */}
            <View style={styles.orderContent}>
              <Image
                source={require("./images/balon1.png")}
                style={styles.orderImage}
              />
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Pedido {item.number}</Text>
                <Text style={styles.orderDate}>
                  Fecha: {new Date(item.fecha).toLocaleDateString()}
                </Text>
                <Text style={styles.orderStatus}>Estado: {item.estado}</Text>
                <Text style={styles.orderTotal}>Total: S/. {item.monto}</Text>
              </View>
            </View>

            {/* Botón para expandir detalles */}
            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>
                {expandedOrderId === item.id ? "Ocultar Detalles" : "Ver Detalles"}
              </Text>
            </TouchableOpacity>

            {/* Detalles de seguimiento expandibles */}
            {expandedOrderId === item.id && (
              <View style={styles.trackingContainer}>
                <Text style={styles.trackingTitle}>Seguimiento del Pedido</Text>
                <View style={styles.stepContainer}>
                  <MaterialIcons name="receipt" size={30} color="red" />
                  <View style={styles.stepDetails}>
                    <Text style={styles.stepStatus}>
                      Pedido registrado el{" "}
                      {new Date(item.fecha).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                <View style={styles.deliveryInfo}>
                  <Icon name="event" size={24} color="red" />
                  <Text style={styles.deliveryText}>
                    Estimado: 5 días hábiles
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    backgroundColor: "red",
    padding: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  orderList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
  },
  orderContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  trackingContainer: {
    marginTop: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  trackingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  stepDetails: {
    paddingLeft: 15,
  },
  stepStatus: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  deliveryText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Producto;
