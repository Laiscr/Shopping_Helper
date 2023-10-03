import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Modal, Button, Alert} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue} from 'firebase/database'
import { firebaseConfig } from '../services/firebaseConfig';

export default function ListaSimples({ navigation }) {
   return(
      <View>
        <Text>Gnahadora</Text>
      </View>
   );
}