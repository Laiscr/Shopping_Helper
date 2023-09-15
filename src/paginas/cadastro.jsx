import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
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
            <Button title='Acessar'>
                <Text>Acessar</Text>
            </Button>
            <Button title='Registrar conta'>
                <Text>Registro</Text>
            </Button>
            <Button title='Voltar' >
                <Text>Voltar</Text>
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
