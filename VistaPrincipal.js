import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { collection, getDocs, addDoc, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase-config";

const VistaPrincipal = () => {
  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Proveedores"));
        const providersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProviders(providersList);
        setFilteredProviders(providersList);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const filtered = providers.filter((provider) =>
      provider.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(filtered);
  }, [searchTerm, providers]);

  const submitRating = async () => {
    if (rating === 0) {
      Alert.alert("Error", "Por favor selecciona una calificación.");
      return;
    }

    try {
      const providerRef = doc(db, "Proveedores", selectedProvider.id);
      await addDoc(collection(providerRef, "calificaciones"), {
        calificacion: rating,
        comentario: comment,
        fecha: new Date(),
      });

      // Actualizar promedio de calificaciones (opcional)
      await updateDoc(providerRef, {
        promedioCalificaciones: increment(rating),
        numeroDeCalificaciones: increment(1),
      });

      Alert.alert("Éxito", "Calificación enviada correctamente.");
      setRating(0);
      setComment("");
      setRatingModalVisible(false);
    } catch (error) {
      console.error("Error al enviar calificación:", error);
      Alert.alert("Error", "No se pudo enviar la calificación.");
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("./images/logo3.png")} style={styles.logo} />
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Buscar Tienda"
              placeholderTextColor="#E1E1E1"
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <MaterialCommunityIcons name="magnify" size={20} color="#E1E1E1" />
          </View>
        </View>
        <Text style={styles.locationText}>Ubicación Actual: Av 6 de diciembre 170589</Text>
      </View>

      {/* Banner */}
      <Image source={require("./images/banner-image.png")} style={styles.bannerImage} />

      {/* Lista de Proveedores */}
      <ScrollView style={styles.distributorList}>
        {filteredProviders.length > 0 ? (
          filteredProviders.map((item) => (
            <View key={item.id} style={styles.distributorCard}>
              <Image source={require("./images/limagas.png")} style={styles.distributorImage} />
              <View style={styles.distributorInfo}>
                <Text style={styles.distributorName}>{item.nombre || "Nombre no disponible"}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedProvider(item);
                    setModalVisible(true);
                  }}
                >
                  <MaterialCommunityIcons name="information" size={24} color="#1C3D72" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rateButton}
                  onPress={() => {
                    setSelectedProvider(item);
                    setRatingModalVisible(true);
                  }}
                >
                  <Text style={styles.rateButtonText}>Calificar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResultsText}>No se encontraron resultados.</Text>
        )}
      </ScrollView>

      {/* Modal para calificar */}
      <Modal
        visible={ratingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRatingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Califica al Proveedor</Text>
            <Text style={styles.modalSubtitle}>Selecciona una calificación:</Text>
            <View style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.ratingButton,
                    rating === value && styles.ratingButtonSelected,
                  ]}
                  onPress={() => setRating(value)}
                >
                  <Text style={styles.ratingButtonText}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.commentBox}
              placeholder="Agregar un comentario (opcional)"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
              <Text style={styles.submitButtonText}>Enviar Calificación</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF0000",
    padding: 20,
  },
  logo: {
    height: 35,
    width: "30%",
    marginBottom: 15,
  },
  searchContainer: {
    marginTop: 10,
    paddingVertical: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  locationText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
    marginTop: 10,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  },
  distributorList: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  distributorCard: {
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  distributorImage: {
    width: "100%",
    height: 150,
  },
  distributorInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
  },
  distributorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rateButton: {
    backgroundColor: "#FF0000",
    padding: 5,
    borderRadius: 5,
  },
  rateButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  ratingButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  ratingButton: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    width: 50,
    alignItems: "center",
  },
  ratingButtonSelected: {
    backgroundColor: "#FFD700",
  },
  ratingButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  commentBox: {
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default VistaPrincipal;
