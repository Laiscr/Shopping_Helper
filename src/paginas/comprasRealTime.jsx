import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/firebaseConfig';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import { useNavigation } from '@react-navigation/native';

initializeApp(firebaseConfig);

export default function ComprasRealTime({ navigation }) {
  const [ValorPosto, setValorPosto] = useState('');
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(false);
  const [botaoFinalizar, setBotaoFinalizar] = useState(false);
  const [textInputDesabilitado, setTextInputDesabilitado] = useState(false);
  const route = useRoute()
  const preco = route.params.preco;
  const [produtos, setProdutos] = useState()
  const [currentDate, setCurrentDate] = useState('');
  const [initialTime, setInitialTime] = useState('');
  const [finalTime, setFinalTime] = useState('');
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    setProdutos(route.params.produtos)
    console.log(route.params)
    console.log('produtos no useeffect')
    console.log(produtos)
    const intervalId = setInterval(
      () => {
        let day = new Date().getDate();
        (day < 10) && (day = `0${day}`);

        let month = new Date().getMonth() + 1;
        (month < 10) && (month = `0${month}`);

        let year = new Date().getFullYear();

        let hours = new Date().getHours();
        (hours < 10) && (hours = `0${hours}`);

        let min = new Date().getMinutes();
        (min < 10) && (min = `0${min}`);

        let sec = new Date().getSeconds();
        (sec < 10) && (sec = `0${sec}`);

        setCurrentDate(
          `${day}/${month}/${year} ${hours}:${min}:${sec}`
        );
      },
      1000
    );

    const initialDate = new Date();
    let initialHours = initialDate.getHours();
    (initialHours < 10) && (initialHours = `0${initialHours}`);

    let initialMinutes = initialDate.getMinutes();
    (initialMinutes < 10) && (initialMinutes = `0${initialMinutes}`);

    let initialSeconds = initialDate.getSeconds();
    (initialSeconds < 10) && (initialSeconds = `0${initialSeconds}`);

    setInitialTime(
      `${initialHours}:${initialMinutes}:${initialSeconds}`
    );

    return () => clearInterval(intervalId);
  }, []);

  function PararContagem() {
    setBotaoFinalizar(!botaoFinalizar);
    if (!botaoFinalizar) {
      const finalDate = new Date();
      let finalHours = finalDate.getHours();
      (finalHours < 10) && (finalHours = `0${finalHours}`);

      let finalMinutes = finalDate.getMinutes();
      (finalMinutes < 10) && (finalMinutes = `0${finalMinutes}`);

      let finalSeconds = finalDate.getSeconds();
      (finalSeconds < 10) && (finalSeconds = `0${finalSeconds}`);
      setFinalTime(`${finalHours}:${finalMinutes}:${finalSeconds}`);
      //navigation.navigate("Historico");
    }

  }

  function Desabilitar() {
    if (ValorPosto.trim() === '') {
      Alert.alert('Insira um Valor', 'É necessário inserir um valor antes de confirmá-lo.');
    } else {
      setBotaoDesabilitado(true);
      setTextInputDesabilitado(true);
      Alert.alert('Valor Confirmado', 'O valor foi confirmado e não pode mais ser alterado.');
    }
  }

  const renderItems = () => {
    return produtos.map((produto) => {

      <View style={estilo.item}>
        <Text>{produto.marca}</Text>
        <Text> {produto.unidmedida}</Text>
        <Text> {produto.preco} </Text>
      </View>
    })
  }

  if (!produtos)
    return <View></View>
  return (
    <View style={estilo.container}>
      <Text style={estilo.normal_words1}>Data: {currentDate.split(' ')[0]}</Text>
      <Text style={estilo.normal_words1}>Início: {initialTime}</Text>
      <Text style={estilo.normal_words1}>Fim: {botaoFinalizar ? finalTime : '-'}</Text>

      <View style={{ flex: 1, width: '100%',  top: -90}}>

        <View style={estilo.item}>
          <Text style={estilo.boldText}>Marca</Text>
          <Text style={estilo.boldText}> Unidade de medida</Text>
          <Text style={estilo.boldText}> Preço </Text>
        </View>
        <ScrollView style={estilo.scrollView}
          contentContainerStyle={estilo.scrollViewContent}>

          {
            produtos ?
              produtos.map((produto) => {
                return (
                  <TouchableOpacity onPress={() => {setSelectedItem(produto)}}  style={produto?.marca == selectedItem?.marca ? estilo.selectedItem : estilo.item}>
                    <Text style={{ width: 100 }}>{produto.marca}</Text>
                    <Text> {produto.unidmedida}</Text>
                    <Text> {produto.preco} </Text>
                  </TouchableOpacity>)
              }) : <></>
          }

        </ScrollView>
      </View>
      <TouchableOpacity title='Escanear produto' style={estilo.scanner} onPress={() => navigation.navigate('ScannerProdutos')}>
        <Text style={estilo.normal_words}>Escanear Produto</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity title='Adicionar' onPress={() => {
          if(!selectedItem){
            Alert.alert("Selecione um item para adicionar")
          }else{
            setProdutos([...produtos, selectedItem])
          }
          
        }}>
          <Entypo name="circle-with-plus" size={50} color="#FFF" style={estilo.positivo} />
        </TouchableOpacity>

        <TouchableOpacity title='Subtrair' onPress={() => {
          if(!selectedItem){
            Alert.alert("Selecione um item para remover")
          }else{
            Alert.alert("Ainda não funciona a remoção de produtos - Júlio")
          }
          
        }}>
          <Entypo name="circle-with-minus" size={50} color="#FFF" style={estilo.negativo} />
        </TouchableOpacity>
      </View>

      <Text style={estilo.TextoNormais}>Meu Valor(R$): {ValorPosto} </Text>
      <TextInput
        placeholder="Digite o valor que será gasto"
        keyboardType='numeric'
        style={estilo.caixa_texto}
        value={ValorPosto}
        onChangeText={(text) => setValorPosto(text)}
        editable={!textInputDesabilitado}
      />

      <TouchableOpacity title='Confirmacao' onPress={Desabilitar} disabled={botaoDesabilitado}>
        <AntDesign name="checkcircle" size={40} color='#000' style={botaoDesabilitado ? estilo.positivo1Desabilitado : estilo.positivo1} />
      </TouchableOpacity>

      <Text style={estilo.TextoNormais1}>Total em Produtos(R$):</Text>
      <TextInput
        placeholder="Valor total dos produtos"
        editable={false}
        style={estilo.caixa_texto1}>
        {preco}
      </TextInput>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity title='Lista' style={estilo.botao}>
          <Text style={estilo.normal_words}>Lista</Text>
        </TouchableOpacity>

        <TouchableOpacity title='Fim' onPress={PararContagem} style={estilo.botao1}>
          <Text style={estilo.normal_words}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  boldText: {
    fontWeight: 'bold'
  },
  scrollView: {
    height: 400, // Set a fixed height of 400 pixels
  },
  scrollViewContent: {
    paddingBottom: 16, // Add padding to the bottom to make room for scrolling
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    backgroundColor: '#FFA747'
  },
  container: {
    flex: 1,
    backgroundColor: '#FF4747',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 120,
  },
  positivo: {
    backgroundColor: '#38B000',
    borderRadius: 60,
    bottom: 20,
    left: 250,
  },
  negativo: {
    backgroundColor: '#6A040F',
    borderRadius: 60,
    bottom: 20,
    left: 270,
  },
  caixa_texto: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    top: 5,
    right: -5,
    width: 250,
    color: 'black',
    fontSize: 17,
  },
  caixa_texto1: {
    backgroundColor: 'pink',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    top: -10,
    width: 250,
    right: -120,
    marginLeft: -110,
    color: 'black',
    fontSize: 17,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  positivo1: {
    backgroundColor: '#38B000',
    borderRadius: 60,
    top: 60,
    left: 280,
  },
  positivo1Desabilitado: {
    backgroundColor: '#999',
    borderRadius: 60,
    top: 175,
    left: 280,
  },
  TextoNormais: {
    fontWeight: 'bold',
    fontSize: 17,
    top: 0,
    marginLeft: 10,
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
  TextoNormais1: {
    fontWeight: 'bold',
    fontSize: 17,
    top: -30,
    left: 10,
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
  botao: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 10,
    marginLeft: 40,
    bottom: 400,
    elevation: 2,
    height: 50,
    width: 140,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  botao1: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 10,
    marginLeft: 40,
    bottom: 400,
    elevation: 2,
    height: 50,
    width: 140,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  normal_words: {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    fontStyle: ('italic'),
    textAlign: 'center',
  },
  scanner: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#000',
    marginLeft: 10,
    top: 40,
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
  normal_words1: {
    fontSize: 20,
    color: 'white',
    top: -100,
    fontStyle: ('italic'),
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',

  },
});
