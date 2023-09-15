import { StatusBar } from 'expo-status-bar';
import React from 'react'; 
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './src/paginas/login';

export default function App() {
  return (
    <View>
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
