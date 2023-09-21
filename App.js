import { StatusBar } from 'expo-status-bar';
import React from 'react'; 
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './src/paginas/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cadastro from './src/paginas/cadastro';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName ='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
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
