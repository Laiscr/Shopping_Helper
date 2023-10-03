import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../services/firebaseConfig';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ToastAndroid } from 'react-native';

initializeApp(firebaseConfig);

export default function ScannerProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [toScan, setToScan] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [produtoData, setProdutoData] = useState({
    marca: '',
    unidmedida: '',
    preco: '',
  });

  useEffect(() => {
    const getBarCodePermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    getBarCodePermission();
  }, []);

  const toggleVisibility = () => {
    setToScan(true);
    setIsVisible(!isVisible);
  };

  function NaoAdicionaProduto() {
    if (produtoData.marca.trim() === '' ||
      produtoData.unidmedida.trim() === '' ||
      produtoData.preco.trim() === '') 
    {
      Alert.alert('Escaneie um produto', 'É preciso que as informações de um produto escaneado sejam lidas.');
    }
    else
    {
      const preco = parseFloat(produtoData.preco);

      // Verificar se o produto já está na lista antes de adicionar
      if (!produtos.some((produto) => produto.marca === produtoData.marca)) {
        setProdutos([...produtos, produtoData]);
        
        // Exibir uma mensagem temporária de sucesso
        ToastAndroid.showWithGravity(
          'Produto adicionado com sucesso. Clique no botão "Ir para Compras", para ver sua lista de produtos.',
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      } else {
        Alert.alert('Produto já adicionado', 'Este produto já foi adicionado à lista.');
      }

      // Redefinir os dados do produto escaneado
      setProdutoData({
        marca: '',
        unidmedida: '',
        preco: '',
      });
    }
  }

  function containsSpecialCharacters(inputString) {
    var pattern = /[.,;/:]/;
    return pattern.test(inputString);
  }

  function handleBarCode({ type, data }) {
    if (!containsSpecialCharacters(data)) {
      const database = getDatabase();
      const produtoRef = ref(database, `Produtos/${data}`);

      onValue(produtoRef, (snapshot) => {
        const data = snapshot.val();
        const newProduct = {
          marca: data.marca,
          unidmedida: data.unidmedida,
          preco: data.preco.toString(),
        };

        if (data) {
          setProdutoData(newProduct);
        } else {
          Alert.alert('Escanee novamente', 'O produto não foi encontrado.');
        }
      });
    }
    setToScan(false);
  }

  // Navegar para a tela ComprasRealTime com os produtos
  function navigateToComprasRealTime() {
    const preco = parseFloat(produtoData.preco);
    navigation.navigate('ComprasRealTime', { preco, produtos });
  }

  if (toScan && hasPermission)
    return (
      <View style={{ flex: 1, display: 'flex' }}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCode}
          style={{ flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }} />
      </View>)

  return (
    <View style={estilo.container}>
{/*{isVisible && (
        <TouchableOpacity title='Cancelar Leitura'
          style={estilo.botaoEspecial}>
          <Text style={estilo.textoEspecial}>Cancelar Leitura</Text>
        </TouchableOpacity>
      )}*/}

      <View>
        <Text style={estilo.TextosNormais}>Produto:</Text>
      </View>
      <TextInput
        placeholder="Nome do produto"
        style={estilo.caixa_texto}
        editable={false}
        value={produtoData.marca}>
      </TextInput>

      <View>
        <Text style={estilo.TextosNormais}>Unid. de medida:</Text>
      </View>
      <TextInput
        placeholder="Unidade de medida do produto"
        style={estilo.caixa_texto}
        editable={false}
        value={produtoData.unidmedida}>
      </TextInput>

      <View>
        <Text style={estilo.TextosNormais}>Preço:</Text>
      </View>
      <TextInput
        placeholder="Preço do produto"
        style={estilo.caixa_texto}
        editable={false}
        value={produtoData.preco}>
      </TextInput>

      <TouchableOpacity title='Escanear produto' style={estilo.botao} onPress={toggleVisibility}>
        <Text style={estilo.normal_words}>Escanear Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity title='Adicionar Produto' onPress={NaoAdicionaProduto} style={estilo.botao2}>
        <Text style={estilo.normal_words}>Adicionar Produto</Text>
      </TouchableOpacity>

      <TouchableOpacity title='Ir para Compras' onPress={navigateToComprasRealTime} style={estilo.botao3}>
        <Text style={estilo.normal_words}>Ir para Compras</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4747',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  TextosNormais: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 15,
  },
  botao: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: -35,
    bottom: -10,
    elevation: 2,
    height: 80,
    width: 300,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  botao2: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: 'black',
    right: -35,
    bottom: -10,
    elevation: 2,
    height: 80,
    width: 300,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  botao3: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#03045E',
    right: -35,
    bottom: -10,
    elevation: 2,
    height: 80,
    width: 300,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  normal_words: {
    fontSize: 30,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  caixa_texto: {
    backgroundColor: 'pink',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    color: 'black',
    fontSize: 15,
    marginLeft: 45,
    width: 300,
    fontSize: 18,
  },
  botaoEspecial: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#264653',
    left: 90,
    bottom: 10,
    elevation: 2,
    height: 50,
    width: 200,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  textoEspecial: {
    textAlign: 'center',
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold'
  }
});
