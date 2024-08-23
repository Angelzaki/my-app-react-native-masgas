import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

const DetailComponent = () => {
  return (
    <Swiper
      style={styles.wrapper}
      dotStyle={{
        marginTop: -200,
        width: 50,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red'
      }}
      activeDotColor="black"
      activeDotStyle={{
        marginTop: -200,
        width: 50,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFF'
      }}
    >
      <View style={styles.slide}>
        <Image
          source={require('../images/balonhd.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require('../images/balonhd.png')}
          style={styles.image}
        />
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  image: {
    marginLeft: 120,
    marginBottom: 130,
    height: 650,
    width: 420,
    marginTop: 40,
    resizeMode: "stretch",
    borderRadius: 100, // Añade el borderRadius aquí
  },
});

export default DetailComponent;
