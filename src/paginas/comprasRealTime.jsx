import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/firebaseConfig';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

initializeApp(firebaseConfig);

export default function ComprasRealTime({ navigation }) {
  const [ValorPosto, setValorPosto] = useState('');
  const [textInputDesabilitado, setTextInputDesabilitado] = useState(false);
  const route = useRoute();
  const preco = parseFloat(route.params.preco);
  const [produtos, setProdutos] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [initialTime, setInitialTime] = useState('');
  const [finalTime, setFinalTime] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [diferenca, setDiferenca] = useState(0);
  const [trocoBackgroundColor, setTrocoBackgroundColor] = useState('green');
  const [botaoFinalizar, setBotaoFinalizar] = useState(false); // Adicionei o estado do botão Finalizar

  useEffect(() => {
    // Calcula o total dos preços dos produtos
    if (produtos.length > 0) {
      const total = produtos.reduce((acc, produto) => acc + parseFloat(produto.preco) * produto.quantidade, 0);
      setTotalProdutos(total.toFixed(2));
    } else {
      setTotalProdutos('0.00');
    }
  }, [produtos]);

  useEffect(() => {
    console.log(route.params.produtos);
    console.log("Julio miudinho ----------------")
    setProdutos(route.params.produtos.map(produto => ({
      ...produto,
      quantidade: 1,
    })));
    
    const intervalId = setInterval(() => {
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
    }, 1000);

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

  useEffect(() => {
    if (ValorPosto.trim() !== '') {
      const valorDigitado = parseFloat(ValorPosto);
      const dif = valorDigitado - parseFloat(totalProdutos);
      setDiferenca(dif.toFixed(2));
      
      // Define a cor de fundo com base na diferença
      if (dif < 0) {
        setTrocoBackgroundColor('red');
      } else {
        setTrocoBackgroundColor('green');
      }
    } else {
      setDiferenca(0);
      setTrocoBackgroundColor('green');
    }
  }, [ValorPosto, totalProdutos]);

  function verificaDiferenca(diferenca) {
    if (parseFloat(diferenca) < 0) {
      Alert.alert(
        'Passou do limite estipulado',
        'Você ultrapassou o valor que possuía. Sua operação agora é para saber quanto falta para pagar.'
      );
    }
  }

  function PararContagem() {
    // Passe as informações de data para a tela Historico
    const finalDate = new Date();
    let finalHours = finalDate.getHours();
    (finalHours < 10) && (finalHours = `0${finalHours}`);
    let finalMinutes = finalDate.getMinutes();
    (finalMinutes < 10) && (finalMinutes = `0${finalMinutes}`);
    let finalSeconds = finalDate.getSeconds();
    (finalSeconds < 10) && (finalSeconds = `0${finalSeconds}`);
    const finalTime = `${finalHours}:${finalMinutes}:${finalSeconds}`;

    navigation.navigate('Historico', {
      currentDate,
      totalProdutos,
      ValorPosto,
      diferenca,
      initialTime,
      finalTime, // Passando a hora final como parâmetro
      produtos,
    });

    if (!botaoFinalizar) {
      setFinalTime(finalTime);
      setBotaoFinalizar(true);
    }
  }

  function Desabilitar() {
    if (ValorPosto.trim() === '') {
      Alert.alert('Insira um Valor', 'É necessário inserir um valor antes de confirmá-lo.');
    } else {
      setTextInputDesabilitado(true);
      verificaDiferenca(diferenca);
      Alert.alert('Valor Confirmado', 'O valor foi confirmado e não pode mais ser alterado.');
    }
  }

  function adicionarProduto(produto) {
    const produtoIndex = produtos.findIndex(p => p.marca === produto.marca);
    if (produtoIndex !== -1) {
      const newProdutos = [...produtos];
      newProdutos[produtoIndex].quantidade += 1;
      setProdutos(newProdutos);
    } else {
      setProdutos([...produtos, { ...produto, quantidade: 1 }]);
    }
  }

  function subtrairProduto(produto) {
    const produtoIndex = produtos.findIndex(p => p.marca === produto.marca);
    if (produtoIndex !== -1) {
      const newProdutos = [...produtos];
      if (newProdutos[produtoIndex].quantidade > 1) {
        newProdutos[produtoIndex].quantidade -= 1;
      } else {
        newProdutos.splice(produtoIndex, 1);
      }
      setProdutos(newProdutos);
    }
  }

  return (
    <View style={estilo.container}>
      <Text style={estilo.normal_words1}>Data: {currentDate.split(' ')[0]}</Text>
      <Text style={estilo.normal_words1}>Início: {initialTime}</Text>
      <Text style={estilo.normal_words1}>Fim: {finalTime || '-'}</Text>

      <View style={{ flex: 1, width: '100%', top: -90 }}>
        <View style={estilo.item}>
          <Text style={estilo.boldText1}>Marca</Text>
          <Text style={estilo.boldText}>Unid. medida</Text>
          <Text style={estilo.boldText1}>Preço</Text>
          <Text style={estilo.boldText}>Quant.</Text>
        </View>
        <View style={{ height: 180 }}>
          <ScrollView
            style={estilo.scrollView}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {produtos.map((produto, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedItem(produto)}
                style={
                  produto?.marca == selectedItem?.marca
                    ? estilo.selectedItem
                    : estilo.item
                }
              >
                <Text style={{ width: 120, fontSize: 16, fontWeight: 'bold', color: '#669bbc' }}>
                  {produto.marca}
                </Text>
                <Text style={{ width: 120, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                  {produto.unidmedida}
                </Text>
                <Text style={{ width: 80, fontSize: 17, fontWeight: 'bold', color: '#669bbc' }}>
                  {produto.preco}
                </Text>
                <Text style={{ width: 20, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                  {produto.quantidade}
                </Text>
                <TouchableOpacity
                  title='Adicionar'
                  onPress={() => adicionarProduto(produto)}
                >
                  <Entypo name="circle-with-plus" size={30} color="#FFF" style={estilo.positivo} />
                </TouchableOpacity>
                <TouchableOpacity
                  title='Subtrair'
                  onPress={() => subtrairProduto(produto)}
                >
                  <Entypo name="circle-with-minus" size={30} color="#FFF" style={estilo.negativo} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        title='Escanear produto'
        style={estilo.scanner}
        onPress={() => navigation.navigate('ScannerProdutos')}
      >
        <Text style={estilo.normal_words}>Escanear Produto</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          title='Adicionar'
          onPress={() => {
            if (!selectedItem) {
              Alert.alert('Selecione um item para adicionar');
            } else {
              adicionarProduto(selectedItem);
            }
          }}
        >
          <Entypo name="circle-with-plus" size={50} color="#FFF" style={estilo.positivo} />
        </TouchableOpacity>

        <TouchableOpacity
          title='Subtrair'
          onPress={() => {
            if (!selectedItem) {
              Alert.alert('Selecione um item para remover');
            } else {
              subtrairProduto(selectedItem);
            }
          }}
        >
          <Entypo name="circle-with-minus" size={50} color="#FFF" style={estilo.negativo} />
        </TouchableOpacity>
      </View>

      <Text style={estilo.TextoNormais}>Valor Disponível(R$):</Text>
      <TextInput
        placeholder="Digite o valor que será gasto"
        keyboardType='numeric'
        style={estilo.caixa_texto}
        value={ValorPosto}
        onChangeText={(text) => setValorPosto(text)}
        editable={!textInputDesabilitado}
      />

      <Text style={estilo.TextoNormais1}>Total em Produtos(R$):</Text>
      <TextInput
        placeholder="Valor total dos produtos"
        editable={false}
        style={estilo.caixa_texto1}
        value={totalProdutos}
      />

      <Text style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
        top: -15,
        backgroundColor: trocoBackgroundColor,
        borderRadius: 5,
        width: 120,
        textAlign: 'center'
      }}>Troco(R$): {diferenca}</Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity title='Lista' style={estilo.botao}
          onPress={() => {
            // Passe as informações de data para a tela Historico
            navigation.navigate('CriacaoListas', {/*{
              currentDate,
              totalProdutos,
              ValorPosto: botaoDesabilitado ? ' ' : ValorPosto,
              diferenca,
              initialTime,
              finalTime,
            */ })
          }}>
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
  scrollView: {
    maxHeight: '100%',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  boldText1: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#669bbc',
  },
  scrollViewContent: {
    paddingBottom: 300,
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
    backgroundColor: '#b23a48',
  },
  container: {
    flex: 1,
    backgroundColor: '#FDF0D5',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 130,
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
    borderWidth: 0.5,
    margin: 5,
    padding: 10,
    borderColor: 'gray',
    top: -14,
    right: -5,
    width: 250,
    color: 'black',
    fontSize: 17,
  },
  caixa_texto1: {
    backgroundColor: '#F5F3F4',
    borderRadius: 10,
    color: 'black',
    margin: 5,
    padding: 10,
    top: -20,
    width: 250,
    right: -120,
    marginLeft: -110,
    borderColor: 'gray',
    fontSize: 17,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  positivo1: {
    backgroundColor: '#38B000',
    borderRadius: 60,
    top: -45,
    left: 280,
  },
  TextoNormais: {
    fontWeight: 'bold',
    fontSize: 17,
    top: -13,
    marginLeft: 10,
    textAlignVertical: 'center',
    textTransform: 'capitalize',
  },
  TextoNormais1: {
    fontWeight: 'bold',
    fontSize: 17,
    top: -17,
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
    bottom: 10,
    elevation: 2,
    height: 50,
    width: 140,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  botao1: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 10,
    marginLeft: 40,
    bottom: 10,
    elevation: 2,
    height: 50,
    width: 140,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  normal_words: {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
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
    },
  },
  normal_words1: {
    fontSize: 20,
    color: '#DA1E37',
    top: -100,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
});
