import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import SettingsScreen from './SettingsScreen';
import VistaPrincipal from './VistaPrincipal';
import Producto from './Producto';
import Micuenta from './MiCuenta';
import Chatbot from './Chatbot';
import Dashboard from './Dashboard';
import PedirBalon from './PedirBalon';
import Detail from './screenspagos/Detail';
import seguimientodecompra from './scrensproducto/seguimientodecompra';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'red' }}>
            <Tab.Screen name='Principal' component={VistaPrincipal} 
                options={{
                    tabBarLabel: 'Principal',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen name='Pedidos' component={ProductoNavigator} // Use ProductoNavigator here
                options={{
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="border-all" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen name='Pedir Balon' component={PedirBalonNavigator} 
                options={{
                    tabBarLabel: 'Pedir Balon',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="fire" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen name='Dashboard' component={Dashboard} 
                options={{
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="barchart" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name='Ajustes' 
                component={SettingsScreen} 
                options={{
                    tabBarLabel: 'Ajustes',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen name='Mi Cuenta' component={Micuenta} 
                options={{
                    tabBarLabel: 'Mi Cuenta',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-tie" color={color} size={size} />
                    ),
                    tabBarBadge: 10,
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

function Home() {
    return (
        <NavigationContainer independent={true}>
            <MyTabs />
        </NavigationContainer>
    );
}


const ProductoNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Producto' component={Producto} />
            <Stack.Screen name='seguimientodecompra' component={seguimientodecompra} />
        </Stack.Navigator>
    );
}

const PedirBalonNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Pedir Balon' component={PedirBalon} />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    );
}

export default Home;
