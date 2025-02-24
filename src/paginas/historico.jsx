import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Image, Alert, ScrollView} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue} from 'firebase/database'
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../services/firebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';


export default function Historico({ navigation }) {
    const route = useRoute();
    const [currentDate, setCurrentDate] = useState();
    const initialTime = route.params.initialTime;
    const [produtos, setProdutos] = useState();
    const finalTime = route.params.finalTime;
    const totalProdutos = route.params.totalProdutos;
    const ValorPosto = route.params.ValorPosto;
    const ValorPostoExibicao = ValorPosto || '-'; //
    const diferenca = route.params.diferenca;
    const [loaded, setLoaded] = useState(false);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [historicoApagado, setHistoricoApagado] = useState(false);

   useEffect(() => {
    console.log("Julio bonitinho ----------------")
    console.log(route.params.produtos);
    console.log("Julio miudinho ----------------")
    setCurrentDate(route.params.currentDate);
    console.log(route.params);
    setLoaded(true);
    setProdutos(route.params.produtos);
    }, [])

    function apagarHistorico() {
        setHistoricoApagado(true);
    }

    function HistoricoMostrar() {
        setModalVisivel(!modalVisivel);
    }
    
   if(!loaded) {
     return(<Text>Chuchu</Text>)
   }

    return(
       <View style={estilo.container}>
        <Image style={estilo.image} source={require('../assets/HistoricoBranco.png')} />
        <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={true}>
        <View style={estilo.modal}>
        <Text style={estilo.titulo}> Informações da Compra </Text>
        <Text style={estilo.subtitulo}>Início da compra: {initialTime}</Text>
        <Text style={estilo.subtitulo}>Final da compra: {finalTime}</Text>
        <View style={{ width: '100%', top: 0 }}>
        <View style={estilo.item}>
          <Text style={estilo.boldText1}>Marca</Text>
          <Text style={estilo.boldText}>Unid. medida</Text>
          <Text style={estilo.boldText1}>Preço</Text>
          <Text style={estilo.boldText}>Quant.</Text>
        </View>
        <View style={{ height: 90 }}>
        <ScrollView
          style={estilo.scrollView}
          contentContainerStyle={estilo.scrollViewContent}
        >
          {produtos?.map((produto, index) => (
            <TouchableOpacity
              key={index} style ={estilo.item}
            >
              <Text style={{ width: 100, fontSize: 16, fontWeight: 'bold', color: '#669bbc' }}>
                {produto.marca}
              </Text>
              <Text style={{ width: 90, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                {produto.unidmedida}
              </Text>
              <Text style={{ width: 80, fontSize: 17, fontWeight: 'bold', color: '#669bbc' }}>
                {produto.preco}
              </Text>
              <Text style={{ width: 20, fontSize: 17, fontWeight: 'bold', color: 'black' }}>
                {produto.quantidade}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      </View>
      
        <Text style={estilo.subtitulo}>Total em Produtos(R$): {totalProdutos}</Text>
        <Text style={estilo.subtitulo}>Valor Inserido(R$): {ValorPostoExibicao}</Text>
        <Text style={estilo.subtitulo}>Troco(R$): {diferenca}</Text>

         <TouchableOpacity
            title='Voltar'
            onPress={() => HistoricoMostrar()}
            style={estilo.botaoAlerta2}>
            <Text style={estilo.normal_words}>Voltar</Text>
          </TouchableOpacity>
      
        </View>
    </Modal>
       
       <View style={{flexDirection: 'row'}}>
       <TouchableOpacity
       onPress={HistoricoMostrar}
       style={estilo.botaoHistorico}>
       <Text style={{fontSize:20, fontWeight: 'bold', color: 'white', margin:5}}>Histórico</Text>
       <Text style={{fontSize:20, fontWeight: 'bold', color: 'white', margin: 5}}>Data: {currentDate?.split(' ')[0]}</Text>
       </TouchableOpacity>

       <TouchableOpacity title='Lixo'>
            <Feather name="trash-2" size={50} color="#000" style={{top: -200, left: 70}}/>
        </TouchableOpacity>
        </View>

        <TouchableOpacity title='Reportar'>
            <Octicons name="report" size={50} color="#000" style={{top: 250, left: 150}}/>
        </TouchableOpacity>
       
       <TouchableOpacity style={estilo.botao}
       onPress={() => navigation.navigate('Botoes')}>
         <Text style={estilo.normal_words}> Fechar </Text>
       </TouchableOpacity>
       </View>
    );
}

const estilo = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FDF0D5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fbc3bc',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    modal: {
        width: '80%',
        height: 350,
        borderRadius: 25,
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderColor: '#641220',
        borderWidth: 1,
    
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 17,
      color:'black',
    },
    boldText1: {
      fontWeight: 'bold',
      fontSize: 17,
      color: '#669bbc',
    },
    titulo: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 12,
        alignContent: 'center',
        justifyContent: 'center',
    },
    botaoAlerta2: {
        justifyContent: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#E01E37',
        left: 175,
        bottom: 45,
        elevation: 2,
        height: 50,
        width: 100,
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
    botao: {
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#6A040F',
        right: 90,
        bottom: -190,
        elevation: 2,
        height: 50,
        width: 170,
        zIndex: 9,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
          height: 3,
          width: 1,
        }
    },
    botaoHistorico: {
        top: -200, 
        right: 60,
        backgroundColor: 'black',
        borderRadius: 10,
        width: 180,
        height: 80
    },
    image: {
        width: 340,
        height: 90,
        top: -210,
        left: -10,
    },
    subtitulo: {
        fontSize: 17,
        color: '#780000',
        margin: 4,
        fontWeight: 'bold',
        textAlign: 'left',
        alignContent: 'center',
        justifyContent: 'center',
    },
});
