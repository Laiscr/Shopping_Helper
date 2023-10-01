import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Modal, Button, Alert} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue} from 'firebase/database'
import { firebaseConfig } from '../services/firebaseConfig';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [senha, setSenha] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handlePress = () => {
    // Julio Cesar Inicio

    const app = initializeApp(firebaseConfig)
    
    const db = getDatabase(app)

    const teste = ref(db, 'teste/')

    onValue(teste, (snapshot) => {
      Alert.alert(snapshot.val())
    })

    // Julio Cesar Fim
    // Lais carlos gordinha

    if (email.trim() === '' || senha.trim() === '') {
      // Se algum campo estiver vazio, mostra um alerta
      setMostrarAlerta(true);

      // Configura um temporizador para esconder o alerta após 3 segundos
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    }
  };

  function AlertaExplicacao() {
    setModalVisivel(!modalVisivel);
  }

  return (
    <View style={estilo.container}>
      <StatusBar
        backgroundColor="#FF4747"  // Define a cor de fundo da barra de status
        barStyle="light-content"    // Define o estilo do texto na barra de status (light ou dark)
      />
      <Modal
        visible={modalVisivel}
        animationType="fade"
        transparent={true}>
        <View style={estilo.modal}>
          <Text style={estilo.titulo}>
            Tem certeza de que deseja continuar sem Logar?
          </Text>

          <Text style={estilo.subtitulo}>
            Se decidir continuar usando o App sem se cadastrar ou fazer login, você poderá somente ler as informações dos produtos.
          </Text>

          <TouchableOpacity
            title='Voltar'
            onPress={() => AlertaExplicacao()}
            style={estilo.botaoAlerta2}
          >
            <Text style={estilo.normal_words}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title='Entendi'
            onPress={() => navigation.navigate('ScannerProdutos')}
            style={estilo.botaoAlerta}
          >
            <Text style={estilo.normal_words}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View>
        <Image style={estilo.image} source={require('../assets/ImagemCor.png')} />

        <Text style={estilo.normal_words}> Login </Text>
        <View>
          <View>
            <Text style={estilo.loginCadastro}> Email: </Text>
            <TextInput
              style={estilo.caixa_texto}
              value={email}
              onChangeText={(email) => setEmail(email)}
              placeholder="Digite seu Email"
            />
          </View>
          <View>
            <Text style={estilo.loginCadastro}> Senha: </Text>
            <TextInput
              style={estilo.caixa_texto}
              value={senha}
              onChangeText={(senha) => setSenha(senha)}
              placeholder="Digite sua Senha"
              keyboardType='numeric'
            />
          </View>

          {mostrarAlerta && (
            <Text style={estilo.alerta}>Preencha todos os campos antes de acessar.</Text>
          )}

          <TouchableOpacity
            title='Acessar'
            style={estilo.botao3}
            onPress={handlePress}
          >
            <Text style={estilo.normal_words}>Acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title='Cadastre-se'
            onPress={() => navigation.navigate('Cadastro')}
            style={estilo.botao}>
            <Text style={estilo.normal_words}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            title='Continuar sem logar'
            style={estilo.botao2}
            onPress={AlertaExplicacao}>
            <Text style={estilo.normal_words}>Continuar sem Logar</Text>
          </TouchableOpacity>

          <Button title='teste'
          onPress={() => navigation.navigate('Botoes')}>
            <Text>Teste</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4747',
    alignItems: 'center',
    justifyContent: 'center',
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
  subtitulo: {
    fontSize: 17,
    color: 'black',
    margin: 4,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  normal_words: {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    fontStyle: ('italic'),
    textAlign: 'center',
  },
  caixa_texto: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    color: 'black',
    fontSize: 15,
    alignContent: 'center',
    justifyContent: 'center',
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
  botao2: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#8D99AE',
    left: 260,
    bottom: -40,
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
  botao3: {
    justifyContent: 'center',
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    center: 'auto',
    bottom: -10,
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
  image: {
    width: 370,
    height: 200,
    alignContent: 'center',
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
  loginCadastro: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  alerta: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
  },
});
