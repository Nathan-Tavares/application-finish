import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import CustomAlert from './CustomAlert';
import styles from './style';

// Função de Login
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCallback, setAlertCallback] = useState(null);

  const showAlert = (title, message, callback) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertCallback(() => callback);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    if (alertCallback) alertCallback();
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      showAlert('Login bem-sucedido!', 'Você está logado.', () => navigation.navigate('Tarefas'));
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      showAlert('Erro', 'Erro ao fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        isVisible={alertVisible}
        onClose={hideAlert}
        title={alertTitle}
        message={alertMessage}
      />
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.createAccount}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
