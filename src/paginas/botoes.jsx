import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
//import AntDesign from 'react-native-vector-icons/AntDesign' 


export default function Botoes({ navigation }) {
  const [modalListaVisivel, setModalListaVisivel] = useState(false);
  const [botoesVisiveis, setBotoesVisiveis] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  

  function CriarMostrarListas() {
    setModalListaVisivel(!modalListaVisivel);
  }

  const toggleBotoes = () => {
    setBotoesVisiveis(!botoesVisiveis);
  };

  function AlertaExplicacao() {
    setModalVisivel(!modalVisivel);
  }

  {/* fazer o modal do botão ver listas, que está comentado.*/}
  return (
    <View style={estilo.container}>
        {/*Modal do botão de escanear produtos*/}
        <EvilIcons name="user" size={90} color="#FFF" style={estilo.usario}/>

        <Text style={estilo.normal_words1}>
            Olá, 
        </Text>
        <View style={estilo.separator} />
        <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={true}>
        <View style={estilo.modal}>
          <Text style={estilo.titulo}>
            Tem certeza de que deseja continuar sem usar a função de Compras?
          </Text>

          <Text style={estilo.subtitulo}>
            Se decidir não usar a função de Compras, você poderá somente ler as informações dos produtos.
          </Text>

          <TouchableOpacity
            title='Voltar'
            onPress={() => AlertaExplicacao()}
            style={estilo.botaoAlerta2}
          >
            <Text style={estilo.normal_words}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title='Continuar'
            onPress={() => navigation.navigate('ScannerProdutos')}
            style={estilo.botaoAlerta}>
            <Text style={estilo.normal_words}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/*<Modal    MODAL PARA VER LISTAS
        visible={modalListaVisivel}
        animationType="fade"
        transparent={true}
      >
        <View style={estilo.modal}>
          <Text style={estilo.subtitulo}>
            Se decidir continuar usando o App sem se cadastrar ou fazer login, você poderá somente ler as informações dos produtos.
          </Text>

          <TouchableOpacity
            title='Voltar'
            onPress={() => CriarMostrarListas()}
            style={estilo.botaoAlerta2}
          >
            <Text style={estilo.normal_words}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title='Entendi'
            onPress={() => navigation.navigate('Cadastro')}
            style={estilo.botaoAlerta}
          >
            <Text style={estilo.normal_words}>Continuar</Text>
          </TouchableOpacity>
        </View>
        </Modal>*/}

      {/*Botão de Lista (mostra e oculta outros dois botões)*/}
      <TouchableOpacity
        title='Listas(ver e criar)'
        style={estilo.botao}
        onPress={toggleBotoes}>
        <Text style={estilo.normal_words}>
          Lista
        </Text>
      </TouchableOpacity>

      {/*Botões ocultos, de início, Ver e Criar Listas*/}
      {botoesVisiveis && (
        <View style={estilo.botoesContainer}>
          <TouchableOpacity title='Ver Listas'
            style={estilo.botao}>
            <Text style={estilo.normal_words}>Ver Listas</Text>
          </TouchableOpacity>

          <TouchableOpacity title='Criar Lista' 
          style={estilo.botao}
          onPress={() => navigation.navigate('CriacaoListas')}>
            <Text style={estilo.normal_words}>Criar Lista</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/*Botão que leva para a tela de listas em tempo real*/}
      <TouchableOpacity
        title='Compras'
        onPress={() => navigation.navigate('ScannerProdutos')}
        style={estilo.botao}>
        <Text style={estilo.normal_words}>
          Compras
        </Text>
      </TouchableOpacity>
      
      {/*Botão que leva para a tela de Histórico*/}
      <TouchableOpacity
        title='Histórico'
        style={estilo.botao}
        onPress={() => navigation.navigate('Historico')}>
        <Text style={estilo.normal_words}>
          Histórico
        </Text>
      </TouchableOpacity>

      {/*Botão que leva de volta a tela de Login*/}
      <TouchableOpacity
        title='Início'
        onPress={() => navigation.navigate('Login')}
        style={estilo.botaoCanto}>
        <Text style={estilo.normal_words}>
          Início
        </Text>
      </TouchableOpacity>

      {/*Botão de escanear produtos, somente*/}
      <TouchableOpacity
            title='Escanear Produtos'
            style={estilo.botao2}
            onPress={AlertaExplicacao}>
            <Text style={estilo.normal_words}>Escanear Produtos</Text>
        </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#FF4747',
   alignItems: 'center',
   justifyContent: 'flex-start',
  },
  botoesContainer: {
   flexDirection: 'row',
  },
  normal_words: {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  botao: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 10,
    bottom: -160,
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
  botaoAlerta: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#E01E37',
    right: -10,
    bottom: 10,
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
  subtitulo: {
    fontSize: 17,
    color: 'black',
    margin: 4,
    textAlign: 'left',
    alignContent: 'center',
    justifyContent: 'center',
  },
  botao2: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#8D99AE',
    left: 130,
    bottom: -180,
    elevation: 2,
    height: 100,
    width: 100,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    }
  },
  usario: {
    width: 350,
    height: 80,
    alignContent: 'center',
    padding: 0,
    marginRight: 25
  },
  titulo: {
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
    padding: 12,
    alignContent: 'center',
    justifyContent: 'center',
  },
  botaoCanto: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 95,
    bottom: -300,
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
   normal_words1: {
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    position: 'relative',
    top: -45,
    fontSize: 20,
    left: -80,
    height: 25,
    width: 40,
   },
   separator: {
    width: '90%', // Largura da linha
    borderBottomColor: 'black', // Cor da linha
    borderBottomWidth: 1.5, // Espessura da linha
    marginVertical: -15, // Espaçamento vertical entre a linha e os elementos
  },
});
