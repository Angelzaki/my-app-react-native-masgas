import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import Swiper from "react-native-swiper";
import SwiperComponent from '../screenspagos/DetailComponent'
import DetailComponent from "../screenspagos/DetailComponent";
function Detail  ({navigation})  {
    return (
        <View
        style={{
            backgroundColor: "#FFF",
            flex:1
        }}
        >
            <View
                style={{
                    flexDirection:"row",
                    width:"100%",
                    height: "90%"
                }}
            >
                <View style={{width:"30%", paddingLeft:20}}>
                    <TouchableOpacity onPress={() =>navigation.goBack()}>
                        <Image
                            source={require('../images/salida.png')}
                            style={{
                                marginVertical:40,
                                height:30,
                                width: 30,
                            }}
                        ></Image>
                    </TouchableOpacity>
                        <View
                            style={{
                                backgroundColor:"#FFF",
                                height:80,
                                width: 80,
                                borderRadius: 5,
                                elevation: 5,
                                marginTop: 50,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require('../images/logo4.png')}
                            >
                            </Image>
                        </View>
                        <View
                            style={{
                                backgroundColor:"#FFF",
                                height:80,
                                width: 80,
                                borderRadius: 5,
                                elevation: 5,
                                marginTop: 100,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require('../images/logo4.png')}
                            >
                            </Image>
                        </View> 
                        <View
                            style={{
                                backgroundColor:"#FFF",
                                height:80,
                                width: 80,
                                borderRadius: 5,
                                elevation: 5,
                                marginTop: 100,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Image
                                source={require('../images/logo4.png')}
                            >
                            </Image>
                        </View>       
                </View>
                <View style={{width: "90%"}}>
                        <DetailComponent />
                </View> 
            </View>
            <View>
                <View
                    style={{
                        flexDirection:"row",
                        marginTop: -60,
                        marginHorizontal: 17,
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            fontWeight:"bold",
                            fontSize: 20,
                        }}
                    >
                     Lima Gas
                    </Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            color:"black",
                            paddingLeft: 240,
                            fontSize: 20
                        }}
                    >
                        $12
                    </Text>
                </View>
                <Text
                    style={{
                        paddingHorizontal: 20,
                        fontWeight: "bold",
                        color: "red",
                        paddingTop: 3,
                        fontSize: 20
                    }}
                >
                    Generico
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%"
                    }}
                >
                    <View
                        style={{
                            width:"50%",
                            backgroundColor:"red",
                            height: 70,
                            marginTop: 20,
                            borderTopLeftRadius: 25,
                            alignItems: "center",
                            justifyContent:"center"
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                fontSize: 17,
                                fontWeight: "bold"
                            }}
                        >
                            Comprar
                        </Text>
                    </View>
                    <View
                        style={{
                            width:"50%",
                            alignItems: "center",
                            justifyContent:"center",
                            marginTop: 20
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontSize: 17,
                                fontWeight: "bold"
                            }}
                        >
                            Descripción
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    )
} 
export default Detail;