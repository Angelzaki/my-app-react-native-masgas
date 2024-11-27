import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "./firebase-config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import moment from "moment";
import "moment/locale/es";

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar notificaciones desde Firestore
  const cargarNotificaciones = async () => {
    try {
      console.log("Cargando notificaciones...");
      const q = query(
        collection(db, "Notificaciones"), // Asegúrate de que la colección existe
        orderBy("fecha", "desc") // Ordenar por fecha descendente
      );
      const querySnapshot = await getDocs(q);

      // Verifica si hay documentos
      if (querySnapshot.empty) {
        console.log("No hay notificaciones en la base de datos.");
        Alert.alert("Sin Notificaciones", "No hay datos para mostrar.");
        setNotificaciones([]);
        return;
      }

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Notificaciones cargadas:", data);
      setNotificaciones(data);
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
      Alert.alert("Error", "No se pudieron cargar las notificaciones.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const renderNotificacion = ({ item }) => (
    <View style={styles.notificacion}>
      <View style={styles.notificacionContent}>
        <Text style={styles.titulo}>{item.titulo || "Promoción"}</Text>
        <Text style={styles.descripcion}>
          {item.descripcion || "Descripción no disponible"}
        </Text>
        <Text style={styles.tiempo}>
          {item.fecha ? moment(item.fecha, "YYYY-MM-DDTHH:mm:ssZ").fromNow() : "Fecha no válida"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.verPromocionButton}
        onPress={() => Alert.alert("Detalle", `Detalles: ${item.descripcion}`)}
      >
        <Text style={styles.verPromocionText}>Ver promoción</Text>
      </TouchableOpacity>
    </View>
  );

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text style={styles.cargandoText}>Cargando notificaciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Centro de Notificaciones</Text>
      <FlatList
        data={notificaciones}
        renderItem={renderNotificacion}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay notificaciones disponibles.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  notificacion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  notificacionContent: {
    flex: 1,
    marginRight: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  descripcion: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  tiempo: {
    fontSize: 12,
    color: "#AAA",
    marginTop: 5,
  },
  verPromocionButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  verPromocionText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  cargandoText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#AAA",
    marginTop: 20,
  },
});
