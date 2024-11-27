import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig, db } from './firebase-config'; // Configuración Firebase

// Importar pantallas
import AdministradorScreen from './screensadministrador/administrador';
import VistaPrincipalProveedor from './VistaPrincipalProveedor';
import VistaPrincipal from './VistaPrincipal';
import Producto from './Producto';
import MyAccountScreen from './MiCuenta';
import Chatbot from './Chatbot';
import PedirBalon from './PedirBalon';
import Dashboard from './Dashboard';
import VistaProveedorAdmin from './screensadministrador/VistaProveedoradmin';
import ActualizarProductoScreen from './screensVistaProveedor/ActualizarProductoScreen';
import AgregarProductoScreen from './screensVistaProveedor/AgregarProductoScreen';
import ConectarServiciosScreen from './screensVistaProveedor/ConectarServiciosScreen';
import EditarPerfilScreen from './screensVistaProveedor/EditarPerfilScreen';
import PerfilScreen from './screensVistaProveedor/PerfilScreen';
import chatbot1 from './screensadministrador/chatbotconfig';
import Registro from './Registro';
import ProveedorScreen from './screensregistro/ProveedorScreen';
import UsuarioScreen from './screensregistro/UsuarioScreen';
import Detail from './screenspagos/Detail';
import GestionCalificaciones from './screensadministrador/calificaciondeproveedor';
import reporteAdmin from './screensadministrador/reporteadmin';
import ConfigurarNotificaciones from './screensadministrador/creaciondeNotificaciones';
import Notificaciones from './Notificaciones';
// Inicializar Firebase
initializeApp(firebaseConfig);

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pantalla de Login
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {
    const auth = getAuth();

    try {
      // Verificar si las credenciales corresponden al administrador
      if (email === 'admin@example.com' && password === 'admin123') {
        navigation.navigate('Administrador'); // Navegar a la pantalla del administrador
      } else {
        // Intentar inicio de sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Consultar el rol del usuario en Firestore
        const userDoc = await getDoc(doc(db, 'Usuarios', user.uid));
        const provider = await getDoc(doc(db, 'Proveedores', user.uid));

        if (userDoc.exists()) {
          navigation.navigate('Home'); // Navegar al Tab Navigator de usuarios
        } else if (provider.exists()) {
          navigation.navigate('VistaPrincipalProveedor'); // Navegar al Tab Navigator de proveedores
        } else {
          Alert.alert('Error', 'No se encontró un rol válido para este usuario.');
        }
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      Alert.alert('Error', 'Credenciales inválidas.');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registro'); // Navegar a la pantalla de registro
  };

  return (
    <View style={styles.maincontainer}>
      <Image
        source={require('./images/logo2.png')}
        style={{
          width: 150,
          height: 150,
          marginBottom: 30,
          alignSelf: 'center',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Acceda a su cuenta</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Correo electrónico"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Contraseña"
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#FF0000' }]}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#FF4500' }]}>
          <Text style={styles.buttonText}>Crea tu Cuenta</Text>
        </TouchableOpacity>
        <Text style={styles.subText}>¿Ya tienes una cuenta? Ingresa aquí</Text>
      </View>
    </View>
  );
}

// MyTabs con diseño limpio
const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: "#f8f9fa",
          borderTopWidth: 1,
          borderTopColor: "#dee2e6",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },
        tabBarIconStyle: { marginTop: 5 },
        tabBarActiveTintColor: "#ff4500",
        tabBarInactiveTintColor: "#6c757d",
      }}
    >
      <Tab.Screen
        name="Principal"
        component={VistaPrincipal}
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size || 26} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={Producto}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={size || 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PedirBalon"
        component={PedirBalon}
        options={{
          tabBarLabel: "Pedir Balón",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="gas-cylinder"
              color={color}
              size={size || 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chatbot"
        component={Chatbot}
        options={{
          tabBarLabel: "Asistente",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="robot-outline" color={color} size={size || 26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={MyAccountScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size || 26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          tabBarLabel: "Notificaciones",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="noti" color={color} size={size || 26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/*
// Navegador de Tabs para Proveedores
const ProviderTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'green',
      tabBarStyle: { height: 60, backgroundColor: '#FFF' },
      tabBarLabelStyle: { fontSize: 12 },
    }}
  >
    <Tab.Screen
      name="Productos"
      component={VistaPrincipalProveedor}
      options={{
        tabBarLabel: 'Productos',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="package-variant" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Agregar Producto"
      component={AgregarProductoScreen}
      options={{
        tabBarLabel: 'Agregar Producto',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus-box" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Actualizar Producto"
      component={ActualizarProductoScreen}
      options={{
        tabBarLabel: 'Actualizar Producto',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="pencil-box" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Servicios Conectados"
      component={ConectarServiciosScreen}
      options={{
        tabBarLabel: 'Servicios',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="link" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Editar Perfil"
      component={EditarPerfilScreen}
      options={{
        tabBarLabel: 'Editar Perfil',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-edit" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
*/
// Navegador Principal
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      {/* Pantalla de Login */}
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      
      {/* Navegador de Usuarios */}
      <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }} />

      {/* Navegador de Registro */}
      <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />

      {/* Navegador de Detalle */}
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      
      {/* Navegador de Registro */}
      <Stack.Screen name="Proveedor" component={ProveedorScreen} options={{ headerShown: false }} />

      {/* Navegador de Registro */}
      <Stack.Screen name="Usuario" component={UsuarioScreen} options={{ headerShown: false }} />

      {/* Navegador de Proveedores */}
      <Stack.Screen name="VistaPrincipalProveedor" component={VistaPrincipalProveedor} options={{ headerShown: false }} />
      
      {/* Navegador de Proveedores - Perfil */}
      <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
      
      {/* Navegador de Proveedores - Editar Perfil */}
      <Stack.Screen name="Editar" component={EditarPerfilScreen} options={{ headerShown: false }} />
      
      {/* Navegador de Proveedores - Agregar Producto */}
      <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} options={{ headerShown: false }} />

      {/* Navegador de Proveedores - Actualizar Producto */}
      <Stack.Screen name="ActualizarProducto" component={ActualizarProductoScreen} options={{ headerShown: false }} />

      {/* Navegador de Proveedores - Conectar  */}
      <Stack.Screen name="Conectar" component={ConectarServiciosScreen} options={{ headerShown: false }} />

      {/* Vista de Administrador */}
      <Stack.Screen name="Administrador" component={AdministradorScreen} options={{ headerShown: false }} />

      {/* Vista de Administrador - chatbot*/}
      <Stack.Screen name="ChatbotConfig" component={chatbot1} options={{ headerShown: false }} />
      
      {/* Vista de Listado de administrador - Administrador */}
      <Stack.Screen name="VistaProveedorAdmin" component={VistaProveedorAdmin} options={{ headerShown: false }} />
    
      {/* Vista de Listado de administrador - Administrador */}
      <Stack.Screen name="Calificacion" component={GestionCalificaciones} options={{ headerShown: false }} />

      {/* Vista de Listado de administrador - Reporte */}
      <Stack.Screen name="Reporte" component={reporteAdmin} options={{ headerShown: false }} />
    
      {/* Vista de Listado de administrador - Reporte */}
      <Stack.Screen name="CreaNotifi" component={ConfigurarNotificaciones} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);


export default AppNavigator;

// Estilos
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  textInput: {
    width: '100%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});
