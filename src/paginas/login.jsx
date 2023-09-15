import { StatusBar } from 'expo-status-bar';
import React from 'react'; 
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
  return (
    <View>
      <View>
        <Text> Shopping helper </Text>
      </View>
      <View>
      <Text> Bem-Vindo </Text>
      </View>
      <View>
        <Text> Login </Text>
        <View>
          <View>
            <Text> Email </Text>
            <TextInput></TextInput>
          </View>
          <View>
            <Text> Senha </Text>
            <TextInput></TextInput>
          </View>
         <Button title='Acessar'>
          <Text>Acessar</Text>
         </Button>
         <Button title='Cadastre-se'>
          <Text>Cadastre</Text>
         </Button>
         <Button title='Continuar sem logar' >
          <Text>Continuar sem logar</Text>
         </Button>
        </View>
      </View>
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
