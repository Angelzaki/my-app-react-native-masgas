import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import VistaPrincipal from './VistaPrincipal';
//Pantalla Principal
function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created');
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(error.message);
      });
  };

  function SvgTop() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={180} height={180} viewBox="0 0 612 344">
        {/* Puedes agregar aquí los elementos SVG que desees */}
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
        >
        </Image>
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
            <Image
              source={require('./images/fb.png')}
              style={{width:40, height:40}}
            >
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button1}
          >
            <Image
              source={require('./images/gm.png')}
              style={{width:40, height:40}}
            >
            </Image>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.button1}
          >
            <Image
              source={require('./images/app.png')}
              style={{width:40, height:40}}
            >
            </Image>
          </TouchableOpacity>
        </View>
        <Text>¿Ya tienes un cuenta? Ingresa aquí</Text>
        <Text>Al crear una cuenta aceptas los</Text>
        <Text>Terminos y Condiciones, Politica de Privacidad</Text>
      </View>
    </View>
  );
}


const Stack = createNativeStackNavigator();
function App(){
  return (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
        ></Stack.Screen>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
        headerShown: false,
        }}
        ></Stack.Screen>
      </Stack.Navigator>
  );
}
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
  titulo: {
    fontSize: 70,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
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
  buttonContainer:{
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 16,
    marginTop: 10,
  },
  button1:{
    flex:1,
    alignItems: 'center',
    backgroundColor: '#ffffff70',
    padding: 16,
    borderRadius: 6,
  },
});
