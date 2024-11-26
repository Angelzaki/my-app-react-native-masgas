import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Reporte() {
  const [tab, setTab] = useState("resumen");

  const enviarNotificaciones = () => {
    Alert.alert(
      "Notificaciones Enviadas",
      "Las notificaciones de mejora han sido enviadas con éxito a los equipos correspondientes."
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panel de Reportes de Feedback de Clientes</Text>
      </View>

      {/* Tab Header */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tabButton, tab === "resumen" && styles.activeTabButton]}
          onPress={() => setTab("resumen")}
        >
          <Text style={[styles.tabText, tab === "resumen" && styles.activeTabText]}>
            Resumen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === "detallado" && styles.activeTabButton]}
          onPress={() => setTab("detallado")}
        >
          <Text style={[styles.tabText, tab === "detallado" && styles.activeTabText]}>
            Detallado
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de los tabs */}
      {tab === "resumen" ? (
        <View style={styles.content}>
          {/* Gráfico de Tendencia */}
          <Text style={styles.chartTitle}>Tendencia de Calificaciones</Text>
          <LineChart
            data={{
              labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
              datasets: [
                {
                  data: [4.2, 4.5, 4.3, 4.6, 4.7, 4.8],
                },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#f7f7f7",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />

          {/* Gráfico de Barras */}
          <Text style={styles.chartTitle}>Distribución de Feedback</Text>
          <BarChart
            data={{
              labels: ["Calidad", "Precio", "Servicio", "Tiempo"],
              datasets: [
                {
                  data: [80, 70, 90, 60],
                },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#f7f7f7",
              backgroundGradientTo: "#f7f7f7",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.detailText}>
            Haga clic en "Ver Reporte Detallado" para mostrar el análisis completo.
          </Text>
        </View>
      )}

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => Alert.alert("Reporte Detallado", "Mostrando reporte detallado...")}
        >
          <Icon name="file-document-outline" size={20} color="#FFF" />
          <Text style={styles.reportButtonText}> Ver Reporte Detallado</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={enviarNotificaciones}
        >
          <Icon name="email-outline" size={20} color="#FFF" />
          <Text style={styles.notificationButtonText}>
            Enviar Notificaciones de Mejora
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notificación */}
      <View style={styles.notification}>
        <Text style={styles.notificationText}>
          <Icon name="check-circle-outline" size={18} color="#007BFF" /> Notificaciones
          Enviadas: Las notificaciones de mejora han sido enviadas con éxito a los equipos
          correspondientes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA", padding: 20 },
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#FFF" },
  tabHeader: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  activeTabButton: { borderBottomColor: "#4CAF50" },
  tabText: { fontSize: 16, color: "#555" },
  activeTabText: { fontWeight: "bold", color: "#4CAF50" },
  content: { marginBottom: 20 },
  chartTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#333" },
  chart: { marginVertical: 10 },
  detailText: { fontSize: 14, color: "#555", marginBottom: 20 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  reportButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  reportButtonText: { color: "#FFF", fontWeight: "bold", marginLeft: 5 },
  notificationButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  notificationButtonText: { color: "#FFF", fontWeight: "bold", marginLeft: 5 },
  notification: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 5,
    borderColor: "#4CAF50",
    borderWidth: 1,
  },
  notificationText: { color: "#4CAF50", fontSize: 14 },
});
