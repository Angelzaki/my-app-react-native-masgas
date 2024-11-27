import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute, useNavigation } from "@react-navigation/native"; // Importa useNavigation

const Detail = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Hook para navegar entre pantallas
  const {
    proveedorNombre,
    productoNombre,
    productoPrecio,
    productoCantidad,
    productoTipoGas,
    productoCapacidad,
  } = route.params;

  const [metodoPago, setMetodoPago] = useState(null);
  const [formularioTarjeta, setFormularioTarjeta] = useState({
    numeroTarjeta: "",
    nombreTitular: "",
    fechaExpiracion: "",
    cvc: "",
  });

  // Función para enviar el pago al servidor
  const handleEnviarPago = async (datosPago) => {
    try {
      const response = await fetch("http://192.168.100.6:3000/api/pagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPago),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          "Gracias por tu compra",
          "El pago se ha procesado correctamente. Serás redirigido a la página principal.",
          [
            {
              text: "Aceptar",
              onPress: () => {
                // Redirigir a la pantalla PedirBalon
                navigation.navigate("PedirBalon");
              },
            },
          ]
        );
        setMetodoPago(null);
        setFormularioTarjeta({
          numeroTarjeta: "",
          nombreTitular: "",
          fechaExpiracion: "",
          cvc: "",
        });
      } else {
        Alert.alert("Error", `Error al procesar el pago: ${result.message}`);
      }
    } catch (error) {
      console.error("Error al realizar el pago:", error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };

  const handlePagoTarjeta = () => {
    const { numeroTarjeta, nombreTitular, fechaExpiracion, cvc } =
      formularioTarjeta;

    if (!numeroTarjeta || !nombreTitular || !fechaExpiracion || !cvc) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    // Datos a enviar al servidor
    const datosPago = {
      cliente: proveedorNombre,
      descripcion: productoNombre,
      monto: productoPrecio,
      metodo: "Tarjeta de Crédito",
      estado: "Pendiente",
    };

    handleEnviarPago(datosPago);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          <MaterialCommunityIcons name="cart" size={24} color="#007BFF" /> Detalle
          del Producto
        </Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>
            <MaterialCommunityIcons name="storefront" size={16} color="#555" />{" "}
            Proveedor:
          </Text>
          <Text style={styles.value}>{proveedorNombre}</Text>
          <Text style={styles.label}>
            <MaterialCommunityIcons name="package-variant" size={16} color="#555" />{" "}
            Producto:
          </Text>
          <Text style={styles.value}>{productoNombre}</Text>
          <Text style={styles.label}>
            <FontAwesome name="money" size={16} color="#555" /> Precio:
          </Text>
          <Text style={styles.value}>S/. {productoPrecio}</Text>
          <Text style={styles.label}>
            <MaterialCommunityIcons name="weight-kilogram" size={16} color="#555" />{" "}
            Cantidad:
          </Text>
          <Text style={styles.value}>{productoCantidad}</Text>
          <Text style={styles.label}>
            <MaterialCommunityIcons name="gas-cylinder" size={16} color="#555" />{" "}
            Tipo de Gas:
          </Text>
          <Text style={styles.value}>{productoTipoGas}</Text>
          <Text style={styles.label}>
            <AntDesign name="filter" size={16} color="#555" /> Capacidad:
          </Text>
          <Text style={styles.value}>{productoCapacidad}</Text>
        </View>
      </View>

      {!metodoPago ? (
        <View style={styles.paymentContainer}>
          <Text style={styles.subtitle}>
            <MaterialCommunityIcons name="credit-card" size={24} color="#007BFF" />{" "}
            Seleccionar Método de Pago
          </Text>
          <TouchableOpacity
            style={[styles.paymentButton, { backgroundColor: "#007BFF" }]}
            onPress={() => setMetodoPago("tarjeta")}
          >
            <FontAwesome name="credit-card" size={20} color="#FFF" />
            <Text style={styles.buttonText}> Tarjeta débito o crédito</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.paymentButton, { backgroundColor: "#28A745" }]}
            onPress={() =>
              Alert.alert(
                "Pago contra-entrega",
                "Su pedido ha sido registrado para pago contra-entrega."
              )
            }
          >
            <MaterialCommunityIcons name="truck-delivery" size={20} color="#FFF" />
            <Text style={styles.buttonText}> Pago Contra-entrega</Text>
          </TouchableOpacity>
        </View>
      ) : metodoPago === "tarjeta" ? (
        <View style={styles.cardForm}>
          <Text style={styles.subtitle}>
            <MaterialCommunityIcons name="form-textbox-password" size={24} color="#007BFF" />{" "}
            Datos de Tarjeta
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Número de la tarjeta"
            keyboardType="numeric"
            value={formularioTarjeta.numeroTarjeta}
            onChangeText={(text) =>
              setFormularioTarjeta({ ...formularioTarjeta, numeroTarjeta: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del titular"
            value={formularioTarjeta.nombreTitular}
            onChangeText={(text) =>
              setFormularioTarjeta({ ...formularioTarjeta, nombreTitular: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Fecha de expiración (MM/AA)"
            keyboardType="numeric"
            value={formularioTarjeta.fechaExpiracion}
            onChangeText={(text) =>
              setFormularioTarjeta({
                ...formularioTarjeta,
                fechaExpiracion: text,
              })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            keyboardType="numeric"
            secureTextEntry
            value={formularioTarjeta.cvc}
            onChangeText={(text) =>
              setFormularioTarjeta({ ...formularioTarjeta, cvc: text })
            }
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handlePagoTarjeta}
          >
            <AntDesign name="checkcircleo" size={20} color="#FFF" />
            <Text style={styles.buttonText}> Pagar</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#4CAF50",
  },
  detailsContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  paymentContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
    color: "#007BFF",
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardForm: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Detail;
