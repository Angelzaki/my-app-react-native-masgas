import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function  seguimientodecompra  ({navigation})  {
  // Datos de ejemplo para los pasos del seguimiento
  const trackingSteps = [
    { id: '1', status: 'Recibimos tu pedido', date: '21/08', time: '20:01', icon: 'receipt', completed: true },
    { id: '2', status: 'Pedido confirmado', date: '21/08', time: '20:51', icon: 'check-circle', completed: true },
    { id: '3', status: '¡Tu pedido está listo!', date: '21/08', time: '20:51', icon: 'shopping-bag', completed: false },
    { id: '4', status: 'Pedido entregado', date: '25/08', time: '19:37', icon: 'check', completed: false },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() =>navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguimiento de Pedido</Text>
      </View>

      {/* Línea de Tiempo Vertical */}
      <FlatList
        data={trackingSteps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.stepContainer}>
            <Icon
              name={item.icon}
              size={30}
              color={item.completed ? 'red' : '#B0B0B0'}
              style={styles.stepIcon}
            />
            <View style={styles.stepDetails}>
              <Text style={styles.stepStatus}>{item.status}</Text>
              <Text style={styles.stepDate}>{item.date} / {item.time}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.timelineContainer}
      />

      {/* Información de Entrega */}
      <View style={styles.deliveryInfo}>
        <Icon name="event" size={24} color="red" />
        <Text style={styles.deliveryText}>Recibe el 30 de Agosto</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: 'red',
    padding: 15,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  timelineContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepIcon: {
    marginRight: 15,
  },
  stepDetails: {
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    paddingLeft: 15,
  },
  stepStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  stepDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: 'red',
  },
  deliveryText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default seguimientodecompra;
