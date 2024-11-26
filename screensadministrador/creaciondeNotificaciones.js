import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../firebase-config";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";

export default function ConfigurarNotificaciones() {
  const [activarNotificaciones, setActivarNotificaciones] = useState(false);
  const [frecuencia, setFrecuencia] = useState("");
  const [proveedores, setProveedores] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [notificaciones, setNotificaciones] = useState([]);
  const [listaProveedores, setListaProveedores] = useState([]);
  const [selectedProveedores, setSelectedProveedores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Cargar notificaciones desde Firestore
  const cargarNotificaciones = async () => {
    try {
      const q = query(collection(db, "Notificaciones"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotificaciones(data);
    } catch (error) {
      console.error("Error al cargar notificaciones:", error);
      Alert.alert("Error", "No se pudieron cargar las notificaciones.");
    }
  };

  // Cargar proveedores desde Firestore
  const cargarProveedores = async () => {
    try {
      const q = query(collection(db, "Proveedores"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
      }));
      setListaProveedores(data);
    } catch (error) {
      console.error("Error al cargar proveedores:", error);
      Alert.alert("Error", "No se pudieron cargar los proveedores.");
    }
  };

  useEffect(() => {
    cargarNotificaciones();
    cargarProveedores();
  }, []);

  // Guardar configuración
  const guardarConfiguracion = async () => {
    if (!frecuencia || selectedProveedores.length === 0 || !palabrasClave) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    try {
      const newNotification = {
        frecuencia,
        proveedores: selectedProveedores.join(", "),
        palabrasClave,
        fecha: new Date().toISOString(),
        estado: activarNotificaciones ? "Activa" : "Inactiva",
      };

      if (editingId) {
        const docRef = doc(db, "Notificaciones", editingId);
        await updateDoc(docRef, newNotification);
        Alert.alert("Éxito", "Notificación actualizada correctamente.");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "Notificaciones"), newNotification);
        Alert.alert("Éxito", "Configuración guardada y notificaciones creadas.");
      }

      setFrecuencia("");
      setSelectedProveedores([]);
      setPalabrasClave("");
      setActivarNotificaciones(false);
      cargarNotificaciones();
    } catch (error) {
      console.error("Error al guardar configuraciones:", error);
      Alert.alert("Error", "Hubo un problema al guardar la configuración.");
    }
  };

  const eliminarNotificacion = async (id) => {
    try {
      await deleteDoc(doc(db, "Notificaciones", id));
      Alert.alert("Éxito", "Notificación eliminada correctamente.");
      cargarNotificaciones();
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
      Alert.alert("Error", "No se pudo eliminar la notificación.");
    }
  };

  const editarNotificacion = (notificacion) => {
    setFrecuencia(notificacion.frecuencia);
    setSelectedProveedores(notificacion.proveedores.split(", "));
    setPalabrasClave(notificacion.palabrasClave);
    setActivarNotificaciones(notificacion.estado === "Activa");
    setEditingId(notificacion.id);
  };

  const toggleProveedorSeleccionado = (proveedor) => {
    if (selectedProveedores.includes(proveedor)) {
      setSelectedProveedores((prev) =>
        prev.filter((item) => item !== proveedor)
      );
    } else {
      setSelectedProveedores((prev) => [...prev, proveedor]);
    }
  };

  const renderProveedor = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.proveedorButton,
        selectedProveedores.includes(item.nombre) && styles.activeProveedorButton,
      ]}
      onPress={() => toggleProveedorSeleccionado(item.nombre)}
    >
      <Text
        style={[
          styles.proveedorButtonText,
          selectedProveedores.includes(item.nombre) &&
            styles.activeProveedorButtonText,
        ]}
      >
        {item.nombre}
      </Text>
    </TouchableOpacity>
  );

  const renderNotificacion = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemTitle}>{item.proveedores}</Text>
        <Text>Frecuencia: {item.frecuencia}</Text>
        <Text>Palabras clave: {item.palabrasClave}</Text>
        <Text>Estado: {item.estado}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editarNotificacion(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => eliminarNotificacion(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {editingId ? "Editar Notificación" : "Configurar Notificaciones"}
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Activar notificaciones automáticas:</Text>
        <Switch
          value={activarNotificaciones}
          onValueChange={setActivarNotificaciones}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Frecuencia de notificaciones:</Text>
        <View style={styles.buttonGroup}>
          {["Diaria", "Semanal", "Mensual"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.frecuenciaButton,
                frecuencia === option && styles.activeFrecuenciaButton,
              ]}
              onPress={() => setFrecuencia(option)}
            >
              <Text
                style={[
                  styles.frecuenciaButtonText,
                  frecuencia === option && styles.activeFrecuenciaButtonText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Proveedores incluidos:</Text>
        <FlatList
          data={listaProveedores}
          renderItem={renderProveedor}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Palabras clave para filtrar productos:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: nuevo, lanzamiento, exclusivo"
          value={palabrasClave}
          onChangeText={setPalabrasClave}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={guardarConfiguracion}>
        <Text style={styles.buttonText}>
          {editingId ? "Actualizar Configuración" : "Guardar Configuración"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subTitle}>Notificaciones Configuradas</Text>
      <FlatList
        data={notificaciones}
        renderItem={renderNotificacion}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  frecuenciaButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  activeFrecuenciaButton: {
    backgroundColor: "#4CAF50",
  },
  frecuenciaButtonText: {
    color: "#555",
    fontSize: 14,
  },
  activeFrecuenciaButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5722",
    padding: 5,
    borderRadius: 5,
  },
  proveedorButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  activeProveedorButton: {
    backgroundColor: "#4CAF50",
  },
  proveedorButtonText: {
    color: "#555",
  },
  activeProveedorButtonText: {
    color: "#FFF",
  },
});
