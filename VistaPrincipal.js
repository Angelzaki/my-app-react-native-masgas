import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ScrollView} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from "expo-linear-gradient";
import Detail from './screenspagos/Detail'

const GasDistributorItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={require('./images/solgas.jpeg')}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.details}>{item.distance}</Text>
        <Text style={styles.rating}>{item.rating}</Text>
      </View>
    </View>
  );
  
const distributors = [
      {
        id: '1',
        name: 'Lima gas Distribuidora',
        address: 'Av. 10 de agosto N89-236',
        distance: '25min/2,5km',
        rating: '4,5 ★ (4000+)',
      },
      // Agregar mas sucesivamente
      {
        id: '2',
        name: 'Sol gas Distribuidora',
        address: 'Av. 18 de septiembre T345',
        distance: '45min/4,5km',
        rating: '3,5 ★ (3000+)',
      },
];

const VistaPrincipal = () => {
    return (
        <View style={{
            backgroundColor: '#FFF',
            flex:1
        }}
        >
        <View style={{
                backgroundColor:'#FF0000',
                height:"25%",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingHorizontal:20,
            }}>
                <Image
                    source={require('./images/logo3.png')}
                    style={{
                        height:35,
                        width:"30%",
                        marginTop: 30
                    }}
                >
                </Image>
                <LinearGradient
                    colors ={['#FF0000', "transparent"]}
                    style={{
                        left:0,
                        right:0,
                        height: 70,
                        margin: 0
                    }}
                >
                    <View style={{
                        backgroundColor: "#FFF",
                        paddingVertical: 8,
                        paddingHorizontal: 8,
                        marginHorizontal: 10,
                        borderRadius: 10,
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <TextInput
                            placeholder="Buscar Tienda"
                            placeholderTextColor="#E1E1E1"
                            style={{
                                fontWeight:"bold",
                                fontSize: 20,
                                width: 160
                            }}
                        >
                        </TextInput>
                        <Image
                            source={require('./images/busqueda.png')}
                            style={{height:20, width:20}}
                        >
                        </Image>
                    </View>
                </LinearGradient>
                <View style={{
                    flexDirection:'row',
                    marginTop: 15,
                    width: '100%'
                }}
                >
                    <View>
                        <Text style={{
                            fontSize:15,
                            color: '#FFF',
                            fontWeight: "bold",
                            width:"100%",
                            
                        }}
                        >
                            Ubicación Actual: Av 6 de diciembre 170589
                        </Text>
                    </View>
                </View>
            </View>
            <Image
                  source={require('./images/banner-image.png')}
                  style={{width:400, height: 150}}
                  >
            </Image>
            <View style={styles.header}>
                      <Text style={styles.headerText}>100 tiendas</Text>
                      <Text style={styles.filterText}>Filtro</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              style={{height: 400}}
            >
              <TouchableOpacity
              onPress={() => navigation}
                style={{
                  height:250,
                  elevation: 2,
                  backgroundColor: '#FFF',
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 10,
                  width: 250
                }}
              >
                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                      <Image
                        source={require('./images/solgas.jpeg')}
                        style={styles.image}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.title}>Sol gas Distribuidora</Text>
                        <Text style={styles.address}>Av. 18 de septiembre T345</Text>
                        <Text style={styles.details}>45min/4,5km</Text>
                        <Text style={styles.rating}>3,5 ★ (3000+)</Text>
                      </View>
                    </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height:250,
                  elevation: 2,
                  backgroundColor: '#FFF',
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 10,
                  width: 300
                }}
              >
                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                      <Image
                        source={require('./images/solgas.jpeg')}
                        style={styles.image}
                      />
                      <View style={styles.infoContainer}>
                        <Text style={styles.title}>Sol gas Distribuidora</Text>
                        <Text style={styles.address}>Av. 18 de septiembre T345</Text>
                        <Text style={styles.details}>45min/4,5km</Text>
                        <Text style={styles.rating}>3,5 ★ (3000+)</Text>
                      </View>
                    </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f0f0',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    filterText: {
      fontSize: 16,
      color: '#007AFF',
    },
    itemContainer: {
      backgroundColor: '#fff',
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
    },
    infoContainer: {
      padding: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    address: {
      fontSize: 10,
      color: '#666',
      marginTop: 4,
    },
    details: {
      fontSize: 10,
      color: '#666',
      marginTop: 2,
    },
    rating: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 4,
    }
});
export default VistaPrincipal;