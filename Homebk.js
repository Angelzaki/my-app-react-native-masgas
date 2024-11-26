import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import SettingsScreen from './SettingsScreen';
import VistaPrincipal from './VistaPrincipal';
import Producto from './Producto';
import MyAccountScreen from './MiCuenta';
import screenEditar from './screensMiCuenta/screenEditar';
import screenConectar from './screensMiCuenta/screenConectar';
import Dashboard from './Dashboard';
import Chatbot from './Chatbot';
import BienvenidoChabto from './BienvenidoChtabot';
import PedirBalon from './PedirBalon';
import Detail from './screenspagos/Detail';
import seguimientodecompra from './scrensproducto/seguimientodecompra';

// Crear navegadores
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegador principal de Tabs
const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'red',
                tabBarStyle: { height: 60 }, // Ajuste para visibilidad
            }}
        >
            <Tab.Screen
                name="Principal"
                component={VistaPrincipal}
                options={{
                    tabBarLabel: 'Principal',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Pedidos"
                component={ProductoNavigator}
                options={{
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="border-all" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Pedir Balon"
                component={PedirBalonNavigator}
                options={{
                    tabBarLabel: 'Pedir Balón',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="fire" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Chatbot"
                component={ChatbotNavigator}
                options={{
                    tabBarLabel: 'Chatbot',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="robot" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="barchart" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Ajustes"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Mi Cuenta"
                component={MiCuentaNavigator}
                options={{
                    tabBarLabel: 'Mi Cuenta',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-tie" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

// Navegador para Producto
const ProductoNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Producto" component={Producto} options={{ headerShown: false }} />
            <Stack.Screen name="seguimientodecompra" component={seguimientodecompra} />
        </Stack.Navigator>
    );
};

// Navegador para Pedir Balón
const PedirBalonNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Pedir Balon" component={PedirBalon} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
};

// Navegador para Mi Cuenta
const MiCuentaNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyAccountScreen"
                component={MyAccountScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="screenEditar"
                component={screenEditar}
                options={{ title: 'Editar Perfil' }}
            />
            <Stack.Screen
                name="screenConectar"
                component={screenConectar}
                options={{ title: 'Conectar' }}
            />
        </Stack.Navigator>
    );
};

// Navegador para Chatbot
const ChatbotNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BienvenidoChabto" component={BienvenidoChabto} />
            <Stack.Screen name="Chatbot" component={Chatbot} />
        </Stack.Navigator>
    );
};

// Componente Principal
const Home = () => {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
};

export default Home;
