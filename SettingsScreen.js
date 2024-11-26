import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ScrollView style={isDarkMode ? styles.containerDark : styles.container}>
      {/* Encabezado con sombra */}
      <View style={isDarkMode ? styles.headerDark : styles.header}>
        <Icon name="arrow-back" size={24} color={isDarkMode ? '#FFF' : 'black'} style={styles.backButton} />
        <Text style={isDarkMode ? styles.headerTitleDark : styles.headerTitle}>Ajustes</Text>
      </View>

      {/* Ajustes Generales */}
      <View style={isDarkMode ? styles.sectionDark : styles.section}>
        <Text style={isDarkMode ? styles.sectionTitleDark : styles.sectionTitle}>Generales</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Notificaciones</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Idioma</Text>
          <View style={styles.fake3D}>
            <Text style={styles.settingButton}>Español</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Tema Oscuro</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          />
        </TouchableOpacity>
      </View>

      {/* Seguridad */}
      <View style={isDarkMode ? styles.sectionDark : styles.section}>
        <Text style={isDarkMode ? styles.sectionTitleDark : styles.sectionTitle}>Seguridad</Text>
        
        <TouchableOpacity style={[styles.settingItem, styles.securityItem]}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Cambiar Contraseña</Text>
          <Icon name="lock-closed" size={24} color={isDarkMode ? '#FFF' : "#333"} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, styles.securityItem]}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Autenticación en Dos Pasos</Text>
          <Icon name="shield-checkmark" size={24} color={isDarkMode ? '#FFF' : "#333"} />
        </TouchableOpacity>
      </View>

      {/* Soporte */}
      <View style={isDarkMode ? styles.sectionDark : styles.section}>
        <Text style={isDarkMode ? styles.sectionTitleDark : styles.sectionTitle}>Soporte</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Centro de Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Reportar un Problema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Información de la Aplicación</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    backgroundColor: '#1C3D72',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5, // Sombra para efecto 3D
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerDark: {
    backgroundColor: '#222',
    padding: 20,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5, // Sombra para efecto 3D
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerTitleDark: {
    fontSize: 24,
    color: '#DDD',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  sectionDark: {
    padding: 20,
    backgroundColor: '#444',
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitleDark: {
    fontSize: 18,
    color: '#DDD',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2, // Efecto 3D para la profundidad
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 16,
    color: 'black',
  },
  settingTextDark: {
    fontSize: 16,
    color: '#FFF',
  },
  settingButton: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  fake3D: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
    elevation: 3, // Añadir sombra para el efecto de profundidad
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  securityItem: {
    backgroundColor: 'red', // Fondo de color más claro para seguridad
  },
  settingButton: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default SettingsScreen;
