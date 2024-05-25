import React, { useState } from 'react'; // Importa o hook useState do React
import { View, TextInput, Text, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Importa a função de criação de usuário do Firebase
import { auth } from '../../config/firebase'; // Importa a configuração de autenticação do Firebase
import CustomAlert from './CustomAlert'; // Importa o componente de alerta personalizado
import styles from './style'; // Importa os estilos

// Função de Registro
export default function Register({ navigation }) {
  // Declarações de estado
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail inserido
  const [password, setPassword] = useState(''); // Estado para armazenar a senha inserida
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar a visibilidade do alerta
  const [alertTitle, setAlertTitle] = useState(''); // Estado para armazenar o título do alerta
  const [alertMessage, setAlertMessage] = useState(''); // Estado para armazenar a mensagem do alerta
  const [alertCallback, setAlertCallback] = useState(null); // Estado para armazenar a função de callback do alerta

  // Função para mostrar o alerta
  const showAlert = (title, message, callback) => {
    setAlertTitle(title); // Define o título do alerta
    setAlertMessage(message); // Define a mensagem do alerta
    setAlertCallback(() => callback); // Define a função de callback do alerta
    setAlertVisible(true); // Torna o alerta visível
  };

  // Função para esconder o alerta
  const hideAlert = () => {
    setAlertVisible(false); // Torna o alerta invisível
    if (alertCallback) alertCallback(); // Executa a função de callback, se houver
  };

  // Função para lidar com o registro
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password); // Tenta criar um novo usuário com o e-mail e senha fornecidos
      showAlert('Registro bem-sucedido!', 'Sua conta foi criada.', () => navigation.navigate('Login')); // Mostra um alerta de sucesso e navega para a tela de login após o usuário clicar em "OK"
    } catch (err) {
      console.error('Erro ao fazer registro:', err); // Log de erro
      showAlert('Erro', 'Erro ao fazer registro. Por favor, tente novamente.'); // Mostra um alerta de erro
    }
  };

  return (
    <View style={styles.container}>
      {/* Componente de alerta personalizado */}
      <CustomAlert
        isVisible={alertVisible} // Visibilidade do alerta
        onClose={hideAlert} // Função para fechar o alerta
        title={alertTitle} // Título do alerta
        message={alertMessage} // Mensagem do alerta
      />
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text> {/* Título da página */}
      </View>
      <View style={styles.form}>
        {/* Campo de entrada para o e-mail */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {/* Campo de entrada para a senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        {/* Botão para registrar */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        {/* Link para a tela de login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccount}>Já tem uma conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
