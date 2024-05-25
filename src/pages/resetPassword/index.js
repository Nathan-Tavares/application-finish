import React, { useState } from 'react'; // Importa o hook useState do React
import { View, TextInput, Text, TouchableOpacity } from 'react-native'; // Importa componentes do React Native
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa a função de envio de e-mail de redefinição de senha do Firebase
import { auth } from '../../config/firebase'; // Importa a configuração de autenticação do Firebase
import CustomAlert from './CustomAlert'; // Importa o componente de alerta personalizado
import styles from './style'; // Importa os estilos

// Função de Redefinição de Senha
export default function ResetPassword({ navigation }) {
  // Declarações de estado
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail inserido
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

  // Função para lidar com a redefinição de senha
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email.trim()); // Envia o e-mail de redefinição de senha
      showAlert(
        'Email enviado!',
        'Verifique seu e-mail para obter um link para redefinir sua senha. Se não aparecer em alguns minutos, verifique sua pasta de spam.',
        () => navigation.navigate('Login') // Navega para a página de login após o usuário clicar em "OK"
      );
    } catch (err) {
      console.error('Erro ao redefinir senha:', err); // Log de erro
      showAlert('Erro', 'Erro ao redefinir senha. Por favor, tente novamente.'); // Mostra o alerta de erro
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
        <Text style={styles.title}>Redefinir Senha</Text> {/* Título da página */}
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
        {/* Botão para enviar o e-mail de redefinição de senha */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        {/* Link para voltar à página de login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccount}>Lembrar senha? Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
