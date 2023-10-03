import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Image, Alert} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue} from 'firebase/database'
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '../services/firebaseConfig';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';


export default function Historico({ navigation }) {
    const route = useRoute();
    const currentDate = route.params.currentDate;
    const initialTime = route.params.initialTime;
    const finalTime = route.params.finalTime;
    const totalProdutos = route.params.totalProdutos;
    const ValorPosto = route.params.ValorPosto;
    const ValorPostoExibicao = ValorPosto || '-'; //
    const diferenca = route.params.diferenca;
    const [modalVisivel, setModalVisivel] = useState(false);
    const [historicoApagado, setHistoricoApagado] = useState(false);

    function apagarHistorico() {
        setHistoricoApagado(true);
    }

    function HistoricoMostrar() {
        setModalVisivel(!modalVisivel);
    }
    
    return(
       <View style={estilo.container}>
        <Image style={estilo.image} source={require('../assets/Historico.png')} />
        <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={true}>
        <View style={estilo.modal}>
        <Text style={estilo.titulo}> Informações da Compra </Text>
        <Text style={estilo.subtitulo}>Início da compra: {initialTime}</Text>
        <Text style={estilo.subtitulo}>Final da compra: {finalTime}</Text>
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
       <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>Histórico</Text>
       <Text style={{fontSize:20, fontWeight: 'bold', color: 'white'}}>Data:</Text>
       <Text style={{textAlign: 'center', fontSize:20, fontWeight: 'bold', color: 'white'}}>{currentDate.split(' ')[0]}</Text>
       </TouchableOpacity>

       <TouchableOpacity title='Lixo'>
            <Feather name="trash-2" size={50} color="#FFF" style={{top: -220, left: 100}}/>
        </TouchableOpacity>
        </View>

        <TouchableOpacity title='Reportar'>
            <Octicons name="report" size={50} color="#FFF" style={{top: 250, left: 140}}/>
        </TouchableOpacity>
       
       <TouchableOpacity style={estilo.botao}
       onPress={() => navigation.navigate('Botoes')}>
         <Text style={estilo.normal_words}> Voltar </Text>
       </TouchableOpacity>
       </View>
    );
}

const estilo = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FF4747',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '80%',
        height: 300,
        borderRadius: 25,
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        borderColor: '#641220',
        borderWidth: 1,
    
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
        bottom: -60,
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
        top: -220, 
        right: 100,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    image: {
        width: 340,
        height: 90,
        top: -240,
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
