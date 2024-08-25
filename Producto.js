import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

function Producto ({navigation})  {
  // Datos de ejemplo para los pedidos
  const orders = [
    { id: '1', number: '000123', date: '2024-08-22', status: 'Entregado', total: '$30.00', image: require('./images/balon1.png') },
    { id: '2', number: '000124', date: '2024-08-23', status: 'En camino', total: '$45.00', image: require('./images/balon1.png') },
    { id: '3', number: '000125', date: '2024-08-24', status: 'Preparando', total: '$60.00', image: require('./images/balon1.png') },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado con efecto de sombra y gradiente */}
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
            <View style={styles.orderContent}>
              {/* Imagen del pedido */}
              <Image source={item.image} style={styles.orderImage} />

              {/* Información del pedido */}
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Pedido #{item.number}</Text>
                <Text style={styles.orderDate}>Fecha: {item.date}</Text>
                <Text style={styles.orderStatus}>Estado: {item.status}</Text>
                <Text style={styles.orderTotal}>Total: {item.total}</Text>
              </View>
            </View>

            {/* Botón para ver detalles */}
            <TouchableOpacity
                title='seguimientodecompra'
                onPress={() => navigation.navigate('seguimientodecompra')}
                style={styles.detailsButton}
            >
              <Text style={styles.detailsButtonText}>Ver Detalles</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F7F8FA',
  },
  header: {
    backgroundColor: 'red',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5, // Sombra para efecto 3D
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  searchIcon: {
    marginRight: 10,
  },
  orderList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5, // Efecto de sombra para simular 3D
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  orderContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  orderTotal: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailsButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
    elevation: 3, // Sombra para efecto 3D en el botón
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  detailsButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Producto;
