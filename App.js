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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Botoes" component={Botoes} />
          <Stack.Screen name="ScannerProdutos" component={ScannerProdutos} />
          <Stack.Screen name="ComprasRealTime" component={ComprasRealTime} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="CriacaoListas" component={CriacaoListas} />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}
