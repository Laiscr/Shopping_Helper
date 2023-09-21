import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Text, TextInput, View, TouchableOpacity, Image, Modal } from 'react-native';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [modalVisivel, setModalVisivel] = useState(false);
  const [senha, setSenha] = useState('');

  
function AlertaExplicacao()
{
  setModalVisivel(!modalVisivel);
}

    return (
    <View style={estilo.container}>
      <Modal 
      visible={modalVisivel}
      animationType="fade" transparent={true}>
        <View style={estilo.modal}>
          <Text>Laís</Text>
          <Button title='Voltar' onPress={()=>AlertaExplicacao()}>  
            <Text>
              Botão
            </Text>
          </Button>
          <Button title='Entendi' onPress={()=>navigation.navigate('Cadastro')}>
            Botão2
          </Button>
        </View>
      </Modal>
      <View>
        <Text style={estilo.titulo}> Shopping helper </Text>
      </View>
      <View>
      <Text style={estilo.subtitulo}> Bem-Vindo </Text>
      </View>
      <View>
        {/*<Image style={estilo.image} source={require('../assets/Imagem.png')}>

      </Image>*/}
        <Text style={estilo.normal_words}> Login </Text>
        <View>
          <View>
            <Text> Email: </Text>
            <TextInput 
            style={estilo.caixa_texto}
            value={email}
            onChangeText={ (email) => setEmail(email) }
            placeholder="Digite seu Email">

            </TextInput>
          </View>
          <View>
            <Text> Senha: </Text>
            <TextInput 
            style={estilo.caixa_texto}
            value={senha}
            onChangeText={ (senha) => setSenha(senha) }
            placeholder="Digite sua Senha"
            keyboardType='numeric'>

            </TextInput>
          </View>
         <TouchableOpacity title='Acessar'
         style={estilo.botao3}>
          <Text style={estilo.normal_words}>Acessar</Text>
         </TouchableOpacity>

         <TouchableOpacity title='Cadastre-se' onPress={()=>navigation.navigate('Cadastro')}
         style={estilo.botao}>
          <Text style={estilo.normal_words}>Cadastrar</Text>
         </TouchableOpacity>
         
         <TouchableOpacity title='Continuar sem logar' 
         style={estilo.botao2}
         onPress={AlertaExplicacao}>
          <Text style={estilo.normal_words}>Continuar sem Logar</Text>
         </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C1121F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
    color: 'black',
    alignContent: 'center',
    justifyContent: 'center',
  },
  subtitulo: {
    fontSize: 25,
    color: 'black',
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
  },
  botao:{
    justifyContent: 'center',
    margin:10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    right: 95,
    bottom:-210,
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
  botao2:{
    justifyContent: 'center',
    margin:10,
    borderRadius: 15,
    backgroundColor: '#8D99AE',
    left: 165,
    bottom:-90,
    elevation: 2,
    height: 100,
    width:100,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
     height: 3,
     width: 1,
    }
   },
   botao3:{
    justifyContent: 'center',
    margin:10,
    borderRadius: 15,
    backgroundColor: '#6A040F',
    center: 0,
    bottom: -10,
    elevation: 2,
    height: 50,
    width:170,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
     height: 3,
     width: 1,
    }
   },
   image: {
    width: 300,
    height: 200,
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
    borderColor: 'blue',
    borderWidth: 1,
    
   }
});
