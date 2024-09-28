import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Svg from 'react-native-svg';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import RegistroScreen from './Registro';
import AdministradorScreen from './screensregistro/AdministradorScreen';
import ProveedorScreen from './screensregistro/ProveedorScreen';
import UsuarioScreen from './screensregistro/UsuarioScreen';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
const { width, height } = Dimensions.get('window');

// Pantalla Principal
function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    console.log('Signed in!');
    navigation.navigate('Home');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registro');
  };

  function SvgTop() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={180} height={180} viewBox="0 0 612 344">
        {/* Aquí puedes añadir elementos SVG si lo deseas */}
      </Svg>
    );
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
      <View style={styles.container}>
        <Image
          source={require('./images/logo2.png')}
          style={{
            width: '30%',
            height: (height / 3) * 0.3,
            borderRadius: 16,
            marginBottom: 40,
          }}
        />
        <Text>Acceda a su cuenta</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Correo electrónico"
          style={styles.textInput}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#FF0000' }]}>
          <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#FF0000' }]}>
          <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Crea tu Cuenta</Text>
        </TouchableOpacity>
        <Text>Registrarme con</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1}>
            <Image source={require('./images/fb.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Image source={require('./images/gm.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1}>
            <Image source={require('./images/app.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
        <Text>¿Ya tienes un cuenta? Ingresa aquí</Text>
        <Text>Al crear una cuenta aceptas los</Text>
        <Text>Términos y Condiciones, Política de Privacidad</Text>
      </View>
    </View>
  );
}

// Configuración del Stack de navegación
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registro"
        component={RegistroScreen}
      />
      <Stack.Screen
        name="Usuario"
        component={UsuarioScreen}
      />
      <Stack.Screen
        name="Proveedor"
        component={ProveedorScreen}
      />
      <Stack.Screen
        name="Administrador"
        component={AdministradorScreen}
      />
    </Stack.Navigator>
  );
}

// Componente principal de navegación
export default function Navigation() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSVG: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    padding: 10,
    borderColor: 'gray',
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
  },
  button: {
    padding: 10,
    marginTop: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
    marginTop: 10,
  },
  button1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    padding: 16,
    borderRadius: 6,
  },
});
