import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Cadastro({navigation}) {
    return (
        <View>
            <View>
                <Text> Cadastre-se </Text>
            </View>
            <View>
                <Text> Nome: </Text>
                <TextInput></TextInput>
            </View>
            <View>
                <Text> Email: </Text>
                <TextInput></TextInput>
            </View>
            <View>
                <Text> Senha: </Text>
                <TextInput></TextInput>
            </View>
            <View>
                <Text> Confirmação de senha: </Text>
                <TextInput></TextInput>
            </View>
            <Button title='Registrar conta'/*</View>onPress={()=>navigation.navigate('Botoes')}*/>
                <Text>Registro</Text>
            </Button>
            <Button title='Voltar' onPress={()=>navigation.navigate('Login')}>
                <Text>Voltar</Text>
            </Button>
            <Button title='Teste' >
                <Text>Teste</Text>
            </Button>
            <Button title='aparecer' >
                <Text>aparecer</Text>
            </Button>
            <Button title='mostrar' >
                <Text>mostrar</Text>
            </Button>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
