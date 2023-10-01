import { StatusBar } from 'expo-status-bar';
import React from 'react'; 
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './src/paginas/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './src/paginas/cadastro';
import Botoes from './src/paginas/botoes';
import ScannerProdutos from './src/paginas/scannerProdutos';
import ComprasRealTime from './src/paginas/comprasRealTime';
import { app } from './src/services/firebaseConfig';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName ='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Botoes" component={Botoes} />
        <Stack.Screen name="ScannerProdutos" component={ScannerProdutos} />
        <Stack.Screen name="ComprasRealTime" component={ComprasRealTime} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1121F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
