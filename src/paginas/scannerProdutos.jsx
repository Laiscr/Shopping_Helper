import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../services/firebaseConfig';
import { BarCodeScanner } from 'expo-barcode-scanner';

initializeApp(firebaseConfig);

export default function ScannerProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [toScan, setToScan] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)
  const [isVisible, setIsVisible] = useState(false);
  const [produtoData, setProdutoData] = useState({
    marca: '',
    unidmedida: '',
    preco: '',
    //imagem:''
  });
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Não carrega as informações automaticamente na inicialização
    const getBarCodePermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    }

    getBarCodePermission();
  }, []);

  const toggleVisibility = () => {
    setToScan(true)
    setIsVisible(!isVisible);
    if (!isVisible) {
      // Carrega as informações apenas quando o botão "Escanear produto" é pressionado
      const database = getDatabase();
      const produtoRef = ref(database, 'Produtos/7896572013905'); 

    }
  };

  function NaoAdicionaProduto() {
    
    console.log('produtos ate agora >>>>> ')
    console.log(produtos)
    if (produtoData.marca.trim() === '' ||
      produtoData.unidmedida.trim() === '' ||
      produtoData.preco.trim() === '') 
    {
      Alert.alert('Escaneie um produto', 'É preciso que as informações de um produto escaneado sejam lidas.');
    }
    else
    {
       navigation.navigate('ComprasRealTime', { preco: produtoData.preco, produtos: produtos }); 
    }
  }

  function containsSpecialCharacters(inputString) {
    // Define a regular expression pattern to match any of the specified characters
    var pattern = /[.,;/:]/;
    
    // Use the test() method to check if the inputString contains any of the characters
    return pattern.test(inputString);
  }

  function handleBarCode({ type, data}){
    console.log('data >>>')
    console.log(data)
    console.log('type >>>')
    if(!containsSpecialCharacters(data)){
    const database = getDatabase();
    const produtoRef = ref(database, `Produtos/${data}`); 

    onValue(produtoRef, (snapshot) => {
      const data = snapshot.val();
      const newProduct = {
        marca: data.marca,
        unidmedida: data.unidmedida,
        preco: data.preco.toString(),
      }
      if(data){
        setProdutoData(newProduct);
        if(produtos.length == 0)
          setProdutos([newProduct])
        else 
          setProdutos([...produtos, newProduct])
      }else {
        Alert.alert("Ecaneie novamente", ['Ok'])
      }
      setTimeout( () => {
        
      }, 1000)
    });
  }
    setToScan(false)
  }
  if(toScan && hasPermission)
    return(
  <View style={{flex: 1, display: 'flex'}}>
    <BarCodeScanner 
      onBarCodeScanned={handleBarCode}
      style={{flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width}}/>
  </View>)
  return (
    <View style={estilo.container}>
      {/*{imageUrl && <Image source={{ uri: imagem }} style={{ width: 200, height: 200 }} />}*/}
      
      {isVisible && (
        <TouchableOpacity title='Cancelar Leitura'
        style={estilo.botaoEspecial}>
          <Text style={estilo.textoEspecial}>Cancelar Leitura</Text>
        </TouchableOpacity> 
      )}

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
    bottom: -30,
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
