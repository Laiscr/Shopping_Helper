import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/paginas/login';
import Cadastro from './src/paginas/cadastro';
import Botoes from './src/paginas/botoes';
import ScannerProdutos from './src/paginas/scannerProdutos';
import ComprasRealTime from './src/paginas/comprasRealTime';
import Historico from './src/paginas/historico';
import CriacaoListas from './src/paginas/criacaoListas';
import { AppProvider } from './src/paginas/AppContext'; // Importe o provedor de contexto

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
          <Stack.Screen name="Botoes" component={Botoes} options={{ headerShown: false }}/>
          <Stack.Screen name="ScannerProdutos" component={ScannerProdutos} options={{ headerShown: false }}/>
          <Stack.Screen name="ComprasRealTime" component={ComprasRealTime} options={{ headerShown: false }}/>
          <Stack.Screen name="Historico" component={Historico} options={{ headerShown: false }}/>
          <Stack.Screen name="CriacaoListas" component={CriacaoListas} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
