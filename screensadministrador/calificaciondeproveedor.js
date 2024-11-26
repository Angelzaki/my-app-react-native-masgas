import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../firebase-config"; // Asegúrate de que la ruta es correcta
import { collection, getDocs } from "firebase/firestore";

export default function GestionCalificaciones() {
  const [tab, setTab] = useState("lista"); // Controla el tab seleccionado
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Proveedores"));
        const data = querySnapshot.docs.map((doc) => {
          const calificaciones = doc.data().calificaciones || [];
          const totalCalificaciones = calificaciones.length;
          const promedio =
            calificaciones.reduce((sum, cal) => sum + cal.calificacion, 0) /
              totalCalificaciones || 0;
          return {
            id: doc.id,
            nombre: doc.data().apellido || "Sin nombre",
            calificacion: promedio.toFixed(1),
            reseñas: totalCalificaciones,
            detalles: calificaciones,
          };
        });
        setProveedores(data);
      } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVerDetalles = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setTab("detalles");
  };

  const renderListaProveedores = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity style={styles.exportButton}>
        <Icon name="file-export" size={20} color="#FFF" />
        <Text style={styles.exportText}> Exportar Datos</Text>
      </TouchableOpacity>
      <FlatList
        data={proveedores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.name}>{item.nombre}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.rating}>
                {item.calificacion} <Icon name="star" size={16} color="#FFD700" />
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.reviews}>{item.reseñas}</Text>
            </View>
            <View style={styles.columnActions}>
              <TouchableOpacity onPress={() => handleVerDetalles(item)}>
                <Icon name="eye" size={24} color="#007BFF" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="trash-can" size={24} color="#FF6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderDetallesProveedor = () => {
    if (!proveedorSeleccionado) return null;

    const data = {
      labels: ["5 estrellas", "4 estrellas", "3 estrellas", "2 estrellas", "1 estrella"],
      datasets: [
        {
          data: proveedorSeleccionado.detalles.reduce(
            (acc, cal) => {
              acc[5 - cal.calificacion]++;
              return acc;
            },
            [0, 0, 0, 0, 0]
          ),
        },
      ],
    };

    return (
      <View style={styles.tabContainer}>
        <Text style={styles.title}>{proveedorSeleccionado.nombre}</Text>
        <Text style={styles.subtitle}>
          Calificación promedio:{" "}
          <Text style={styles.rating}>{proveedorSeleccionado.calificacion}</Text>
        </Text>
        <Text style={styles.subtitle}>
          Número total de reseñas: {proveedorSeleccionado.reseñas}
        </Text>
        <Text style={styles.chartTitle}>Distribución de Calificaciones</Text>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#F1F8E9",
            backgroundGradientTo: "#F1F8E9",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setTab("lista")}
        >
          <Icon name="arrow-left" size={20} color="#FFF" />
          <Text style={styles.backButtonText}> Regresar a la Lista</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gestión de Calificaciones</Text>
      </View>
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "lista" && styles.activeTabButton,
          ]}
          onPress={() => setTab("lista")}
        >
          <Text style={[styles.tabText, tab === "lista" && styles.activeTabText]}>
            Lista de Proveedores
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            tab === "detalles" && styles.activeTabButton,
          ]}
          onPress={() => setTab("detalles")}
          disabled={!proveedorSeleccionado}
        >
          <Text
            style={[styles.tabText, tab === "detalles" && styles.activeTabText]}
          >
            Detalles del Proveedor
          </Text>
        </TouchableOpacity>
      </View>
      {tab === "lista" ? renderListaProveedores() : renderDetallesProveedor()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  header: {
    backgroundColor: "#4CAF50",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    elevation: 5,
  },
  headerTitle: { fontSize: 20, color: "#FFF", fontWeight: "bold" },
  tabHeader: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    padding: 15,
  },
  activeTabButton: { borderBottomWidth: 3, borderBottomColor: "#4CAF50" },
  tabText: { fontSize: 14, color: "#555" },
  activeTabText: { fontWeight: "bold", color: "#4CAF50" },
  tabContainer: { flex: 1, padding: 20 },
  exportButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  exportText: { color: "#FFF", fontSize: 14, fontWeight: "bold", marginLeft: 5 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  column: { flex: 2 },
  columnActions: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  rating: { fontSize: 16, fontWeight: "bold", color: "#555" },
  reviews: { fontSize: 16, color: "#555" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#4CAF50" },
  subtitle: { fontSize: 16, marginBottom: 10, color: "#555" },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#555" },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  backButtonText: { color: "#FFF", fontSize: 14, fontWeight: "bold", marginLeft: 5 },
});
