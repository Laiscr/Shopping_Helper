import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Alert, TouchableOpacity } from 'react-native';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const handlePress = () => {
    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '' || confirmacaoSenha.trim() === '') {
      // Se algum campo estiver vazio, mostra um alerta
      setMostrarAlerta(true);

      // Configura um temporizador para esconder o alerta após 3 segundos
      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    } else {
      Alert.alert('Registrado(a)', 'Seu cadastro foi concluído com sucesso!');
    }
  };

  return (
    <View style={estilo.container}>
      <Image style={estilo.image} source={require('../assets/Cadastro.png')} />

      <View>
        <Text style={estilo.normal_words}> Cadastre-se </Text>
      </View>
      <View>
        <Text style={estilo.loginCadastro}> Nome: </Text>
        <TextInput
          style={estilo.caixa_texto}
          placeholder="Digite seu Nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View>
        <Text style={estilo.loginCadastro}> Email: </Text>
        <TextInput
          style={estilo.caixa_texto}
          placeholder="Digite seu Email de Cadastro"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <Text style={estilo.loginCadastro}> Senha: </Text>
        <TextInput
          style={estilo.caixa_texto}
          placeholder="Digite uma senha"
          keyboardType='numeric'
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      <View>
        <Text style={estilo.loginCadastro}> Confirmação de senha: </Text>
        <TextInput
          style={estilo.caixa_texto}
          placeholder="Digite novamente a senha"
          keyboardType='numeric'
          value={confirmacaoSenha}
          onChangeText={setConfirmacaoSenha}
        />
      </View>

      {mostrarAlerta && (
        <Text style={estilo.alerta}>Preencha todos os campos antes de registrar.</Text>
      )}

      <TouchableOpacity
        title='Registrar conta'
        style={estilo.botao}
        onPress={handlePress}
      >
        <Text style={estilo.normal_words}>
          Registrar Conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        title='Voltar'
        onPress={() => navigation.navigate('Login')}
        style={estilo.botao}
      >
        <Text style={estilo.normal_words}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FF4747',
    padding: 10,
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
    fontStyle: 'italic',
    textAlign: 'center',
  },
  caixa_texto: {
    width: 300,
    height: 'auto',
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
    margin: 17,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    center: 'auto',
    elevation: 2,
    height: 50,
    width: 170,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  image: {
    width: 350,
    height: 80,
    alignContent: 'center',
    padding: 10,
  },
  loginCadastro: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  alerta: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
