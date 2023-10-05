import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from './AppContext';

export default function CriacaoListas({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [anotacoes, setAnotacoes] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [valorConfirmado, setValorConfirmado] = useState(false);
  const [tituloConfirmado, setTituloConfirmado] = useState(false);
  const [titulo, setTitulo] = useState('');

  const [state, dispatch] = useAppContext();

  // Função para salvar as informações no contexto
  const salvarInformacoes = () => {
    dispatch({
      type: 'SALVAR_INFORMACOES',
      payload: {
        inputText,
        // outras informações que você deseja salvar
      },
    });
  };

  const valorInputRef = useRef(null);

  const adicionarItem = () => {
    if (inputText.trim() !== '') {
      setChecklist([...checklist, { texto: inputText, concluido: false }]);
      setInputText('');
    }
  };

  const toggleConcluido = (index) => {
    const novaLista = [...checklist];
    novaLista[index].concluido = !novaLista[index].concluido;
    setChecklist(novaLista);
  };

  const confirmarAnotacoes = () => {
    valorInputRef.current.focus();
  };

  const confirmarValor = () => {
    setValorConfirmado(true);
    setMensagem(`Atenção: Valor inserido - ${valor}`);
  };

  const confirmarTitulo = () => {
    if (titulo.trim() !== '') {
      setTituloConfirmado(true);
    }
  };

  return (
    <View style={estilo.container}>
      <View style={estilo.tituloContainer}>
        {!tituloConfirmado ? (
          <TextInput
            style={estilo.tituloInput}
            placeholder="Insira o título"
            value={titulo}
            onChangeText={(text) => setTitulo(text)}
          />
        ) : (
          <Text style={estilo.tituloTexto}>{titulo}</Text>
        )}
        {!tituloConfirmado && (
          <TouchableOpacity onPress={confirmarTitulo} style={estilo.button}>
            <Text style={estilo.buttonText}>Confirmar Título</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={estilo.checklist}>
        <Text style={estilo.titulo}>Checklist de Produtos</Text>
        <TextInput
          style={estilo.input}
          placeholder="Adicionar item..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={adicionarItem}
        />
        <FlatList
          data={checklist}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={estilo.item}
              onPress={() => toggleConcluido(index)}
            >
              <Text
                style={[
                  estilo.itemTexto,
                  item.concluido ? estilo.itemConcluido : null,
                ]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={estilo.anotacoes}>
        <Text style={estilo.titulo}>Anotações adicionais</Text>
        <TextInput
          style={estilo.caixa_texto}
          placeholder="Faça anotações aqui..."
          multiline={true}
          numberOfLines={10}
          value={anotacoes}
          onChangeText={(text) => setAnotacoes(text)}
        />
        <TouchableOpacity onPress={confirmarAnotacoes} style={estilo.button}>
          <Text style={estilo.buttonText}>Confirmar Anotações</Text>
        </TouchableOpacity>
        <View style={estilo.valorContainer}>
          <Text style={estilo.valorTexto}>Valor a ser gasto (R$):</Text>
          <TextInput
            ref={valorInputRef}
            style={[
              estilo.input,
              estilo.valorInput,
              valorConfirmado && estilo.valorConfirmado,
            ]}
            placeholder="Inserir Valor"
            value={valor}
            onChangeText={(text) => !valorConfirmado && setValor(text)}
            editable={!valorConfirmado}
          />
          {!valorConfirmado && (
            <TouchableOpacity onPress={confirmarValor} style={estilo.button1}>
              <Text style={estilo.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ScannerProdutos')} style={estilo.button}>
          <Text style={estilo.buttonText}>Compras</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    flexDirection: 'column',
    backgroundColor: '#FDF0D5',
  },
  tituloContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  tituloInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    height: 40,
    top: -10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  tituloTexto: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  checklist: {
    flex: 1,
    padding: 16,
  },
  anotacoes: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    top: -5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTexto: {
    fontSize: 18,
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorInput: {
    flex: 1,
    color: 'black',
    fontSize: 20,
  },
  valorConfirmado: {
    backgroundColor: '#76C893',
  },
  button: {
    borderRadius: 10,
    height: 40,
    top: -10,
    margin: 5,
    padding: 9,
    backgroundColor: '#6A040F',
    alignContent: 'center',
    elevation: 2,
    width: 170,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  button1: {
    borderRadius: 10,
    height: 40,
    top: -10,
    margin: 5,
    padding: 9,
    backgroundColor: '#6A040F',
    alignContent: 'center',
    elevation: 2,
    width: 50,
    zIndex: 9,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 3,
      width: 1,
    },
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
    fontStyle: 'italic',
  },
  
  caixa_texto: {
    height: 90,
    top: -10,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
    margin: 5,
    padding: 10,
    color: 'black',
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  valorTexto: {
    fontSize: 17,
    marginRight: 10,
    textAlign: 'center',
    top: -10,
    fontWeight: 'bold',
  },
});
