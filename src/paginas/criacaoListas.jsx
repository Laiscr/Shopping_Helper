import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';

export default function CriacaoListas({ navigation }) {
  const [inputText, setInputText] = useState(''); // Estado para armazenar o texto do input
  const [checklist, setChecklist] = useState([]); // Estado para armazenar a lista de itens do checklist
  const [anotacoes, setAnotacoes] = useState(''); // Estado para armazenar as anotações
  const [valor, setValor] = useState(''); // Estado para armazenar o valor inserido
  const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem temporária
  const [valorConfirmado, setValorConfirmado] = useState(false); // Estado para controlar a confirmação do valor
  const [tituloConfirmado, setTituloConfirmado] = useState(false); // Estado para controlar a confirmação do título
  const [titulo, setTitulo] = useState(''); // Estado para armazenar o título

  // Ref para o TextInput de valor
  const valorInputRef = useRef(null);

  // Função para adicionar um item à lista quando o usuário pressiona "Enter"
  const adicionarItem = () => {
    if (inputText.trim() !== '') {
      setChecklist([...checklist, { texto: inputText, concluido: false }]);
      setInputText(''); // Limpa o input
    }
  };

  // Função para marcar/desmarcar um item como concluído
  const toggleConcluido = (index) => {
    const novaLista = [...checklist];
    novaLista[index].concluido = !novaLista[index].concluido;
    setChecklist(novaLista);
  };

  // Função para confirmar anotações e focar no TextInput de valor
  const confirmarAnotacoes = () => {
    // Aqui, você pode usar o valor de 'anotacoes' como necessário
    // Remova o alert que exibia as anotações
    valorInputRef.current.focus(); // Foca no TextInput de valor
  };

  // Função para confirmar o valor inserido
  const confirmarValor = () => {
    // Aqui, você pode usar o valor de 'valor' como necessário
    // Por enquanto, vamos definir uma mensagem temporária
    setValorConfirmado(true); // Define o valor como confirmado
    setMensagem(`Atenção: Valor inserido - ${valor}`);
  };

  // Função para confirmar o título
  const confirmarTitulo = () => {
    if (titulo.trim() !== '') {
      setTituloConfirmado(true); // Define o título como confirmado
    }
  };

  return (
    <View style={estilo.container}>
      <View style={estilo.tituloContainer}>
        {/* Título */}
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
        {/* Seção da Checklist */}
        <Text style={estilo.titulo}>Checklist de Produtos</Text>
        <TextInput
          style={estilo.input}
          placeholder="Adicionar item..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          onSubmitEditing={adicionarItem} // Chama a função ao pressionar "Enter"
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
        {/* Seção das Anotações */}
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
        {/* Valor inserido */}
        <View style={estilo.valorContainer}>
          <TextInput
            ref={valorInputRef} // Referência para o TextInput de valor
            style={[
              estilo.input,
              estilo.valorInput,
              valorConfirmado && estilo.valorConfirmado,
            ]}
            placeholder="Inserir Valor"
            value={valor}
            onChangeText={(text) => !valorConfirmado && setValor(text)}
            editable={!valorConfirmado} // Desabilita a edição após a confirmação
          />
          {!valorConfirmado && (
            <TouchableOpacity onPress={confirmarValor} style={estilo.button}>
              <Text style={estilo.buttonText}>Confirmar Valor</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Botão para ir para a tela ComprasRealTime */}
        <TouchableOpacity onPress={() => navigation.navigate('ScannerProdutos')} style={estilo.button}>
          <Text style={estilo.buttonText}>Começar Compras</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1, // 66.67% da altura
    padding: 16,
  },
  anotacoes: {
    flex: 1, // 33.33% da altura
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
    color: 'gray',
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valorInput: {
    flex: 1,
  },
  valorConfirmado: {
    backgroundColor: '#76C893', // Estilize a cor conforme necessário
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
    height: 40,
    width: 170,
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
    fontStyle: ('italic'),
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
});
