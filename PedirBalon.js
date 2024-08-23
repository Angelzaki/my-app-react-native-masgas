import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function PedirBalon ({navigation})  {
    return (
        <View
            style={{
                backgroundColor: '#FFF',
                flex:1,
                height:"20%"
            }}
        >
            <Text>Tienda / Lima Gas Distribuidora / Productos</Text>
            <Image
                source={require('./images/balones.png')}
                style={styles.headerImage}
            />
            <View style={styles.companyInfo}>
                <Image
                source={require('./images/logo4.png')}
                style={styles.logo}
                />
                <Text style={styles.companyName}>Lima Gas Distribuidora</Text>
                <Text style={styles.address}>Av. 10 de agosto N89-236</Text>
                <Text style={styles.details}>25 min/2,5km</Text>
                <Text style={styles.rating}>4,5 (4000+)</Text>
            </View>
            <Text style={styles.sectionTitle}>Productos</Text>
            <View style={styles.productCard}>
              <TouchableOpacity
                title='Detail'
                onPress={() => navigation.navigate('Detail')}
              >
                <Image
                source={require('./images/balon1.png')}
                style={styles.productImage}
                />
                <View style={styles.productInfo}>
                <Text style={styles.productName}>Gas Premium</Text>
                <Text style={styles.productWeight}>10 Kg</Text>
                <Text style={styles.productPrice}>$12</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    companyInfo: {
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    companyName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
    address: {
      fontSize: 14,
      color: '#666',
    },
    details: {
      fontSize: 14,
      color: '#666',
    },
    rating: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 5,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    productCard: {
      flexDirection: 'row',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    productImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
    productInfo: {
      marginLeft: 20,
      justifyContent: 'center',
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    productWeight: {
      fontSize: 14,
      color: '#666',
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });

export default PedirBalon;