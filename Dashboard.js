import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import MapView, { Heatmap } from 'react-native-maps';

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard de Ventas</Text>
        <Text style={styles.date}>Última actualización: 23 de agosto, 2024</Text>
      </View>

      {/* Métricas Principales */}
      <View style={styles.metricsContainer}>
        <Text style={styles.metricTitle}>Ventas Totales de Gas Envasado</Text>
        <BarChart
          data={{
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{ data: [50, 45, 28, 80, 99, 43] }]
          }}
          width={350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />

        <Text style={styles.metricTitle}>Uso de la App</Text>
        <LineChart
          data={{
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{ data: [20, 10, 15, 30, 40, 60] }]
          }}
          width={350}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>

      {/* Insights */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightTitle}>Top 5 Productos Vendidos</Text>
        <PieChart
          data={[
            { name: 'Gas 10kg', population: 215, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Gas 20kg', population: 280, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Gas 45kg', population: 527, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Gas Estufa', population: 150, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Gas Automotor', population: 430, color: 'orange', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]}
          width={350}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      {/* Mapa de Calor de Ventas por Región */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.189967,
          longitude: -75.015152,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        <Heatmap
          points={[
            { latitude: -12.0464, longitude: -77.0428, weight: 1 },
            { latitude: -16.409, longitude: -71.537, weight: 2 },
            { latitude: -13.525, longitude: -71.972, weight: 3 }
          ]}
          radius={50}
          opacity={0.6}
        />
      </MapView>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#FF0000',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  date: {
    color: '#FFF',
    fontSize: 12,
  },
  metricsContainer: {
    padding: 20,
  },
  metricTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
  },
  insightsContainer: {
    padding: 20,
  },
  insightTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  map: {
    height: 200,
    margin: 20,
    borderRadius: 10,
  },
});

export default Dashboard;
