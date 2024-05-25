import React, { useState, useEffect } from "react"; // Importa os hooks useState e useEffect do React
import { View, FlatList, Text, TouchableOpacity, TextInput } from "react-native"; // Importa componentes do React Native
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore"; // Importa funções do Firestore para gerenciar documentos
import { signOut } from 'firebase/auth'; // Importa a função de logout do Firebase
import { auth, db } from '../../config/firebase'; // Importa a configuração de autenticação e banco de dados do Firebase
import { Feather } from '@expo/vector-icons'; // Importa ícones Feather da biblioteca expo-vector-icons
import CustomAlert from './CustomAlert'; // Importa o componente de alerta personalizado
import styles from './style'; // Importa os estilos

const tarefasCollection = collection(db, "tarefas"); // Define a coleção de tarefas no Firestore

// Função principal para a tela de Tarefas
export default function Tarefas({ navigation }) {
  // Declarações de estado
  const [tasks, setTasks] = useState([]); // Estado para armazenar a lista de tarefas
  const [newTaskText, setNewTaskText] = useState(''); // Estado para armazenar o texto da nova tarefa
  const [editingId, setEditingId] = useState(null); // Estado para armazenar o ID da tarefa sendo editada
  const [editingText, setEditingText] = useState(''); // Estado para armazenar o texto da tarefa sendo editada
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

  // Função para deletar uma tarefa
  async function deleteTask(id) {
    try {
      await deleteDoc(doc(tarefasCollection, id)); // Deleta a tarefa do Firestore
      await fetchData(); // Atualiza a lista de tarefas
      showAlert('Tarefa deletada', 'A tarefa foi removida com sucesso.'); // Mostra um alerta de sucesso
    } catch (error) {
      console.error(`Error deleting task: ${error.message}`); // Log de erro
    }
  }

  // Função para adicionar uma nova tarefa
  async function addTask(text) {
    try {
      await addDoc(tarefasCollection, { tarefa: text }); // Adiciona uma nova tarefa ao Firestore
      setNewTaskText(''); // Limpa o campo de texto da nova tarefa
      await fetchData(); // Atualiza a lista de tarefas
      showAlert('Tarefa adicionada', 'A nova tarefa foi adicionada com sucesso.'); // Mostra um alerta de sucesso
    } catch (error) {
      console.error(`Error adding task: ${error.message}`); // Log de erro
    }
  }

  // Função para buscar as tarefas do Firestore
  async function fetchData() {
    try {
      const taskSnapshot = await getDocs(tarefasCollection); // Busca todas as tarefas no Firestore
      const taskList = taskSnapshot.docs.map((doc) => ({ id: doc.id, tarefa: doc.data().tarefa })); // Cria uma lista de tarefas
      setTasks(taskList); // Define o estado com a lista de tarefas
    } catch (error) {
      console.error("Error fetching tasks:", error.message); // Log de erro
    }
  }

  // Hook de efeito para buscar as tarefas quando o componente é montado
  useEffect(() => {
    fetchData(); // Busca as tarefas
  }, []);

  // Função para lidar com a adição de uma nova tarefa
  const handleAddTask = async () => {
    if (newTaskText.trim() !== '') {
      await addTask(newTaskText); // Adiciona a nova tarefa se o texto não estiver vazio
    } else {
      showAlert('Erro', 'A tarefa não pode estar vazia.'); // Mostra um alerta de erro
    }
  };

  // Função para editar uma tarefa
  async function editTask(id, newText) {
    if (!newText) {
      showAlert('Erro', 'A tarefa editada não pode estar vazia.'); // Mostra um alerta de erro
      return;
    }
    try {
      const taskDocRef = doc(db, 'tarefas', id); // Referência do documento da tarefa no Firestore
      await updateDoc(taskDocRef, { tarefa: newText }); // Atualiza o texto da tarefa no Firestore
      setEditingId(null); // Limpa o ID da tarefa sendo editada
      setEditingText(''); // Limpa o texto da tarefa sendo editada
      fetchData(); // Atualiza a lista de tarefas
      showAlert('Tarefa editada', 'A tarefa foi editada com sucesso.'); // Mostra um alerta de sucesso
    } catch (error) {
      console.error(`Error editing task: ${error.message}`); // Log de erro
    }
  }

  // Função para lidar com o logout
  const handleLogout = async () => {
    await signOut(auth); // Faz logout do usuário
    showAlert('Logout bem-sucedido!', 'Você foi desconectado.', () => navigation.navigate('Login')); // Mostra um alerta de sucesso e navega para a tela de login após o usuário clicar em "OK"
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
      <View style={styles.inputContainer}>
        {/* Campo de entrada para a nova tarefa */}
        <TextInput
          style={styles.input}
          placeholder="Nova Tarefa"
          value={newTaskText}
          onChangeText={setNewTaskText}
        />
        {/* Botão para adicionar a nova tarefa */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {/* Lista de tarefas */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.task} key={item.id}>
            {editingId === item.id ? (
              <TextInput
                style={styles.taskText}
                value={editingText}
                onChangeText={setEditingText}
                onSubmitEditing={() => editTask(item.id, editingText)}
              />
            ) : (
              <Text style={styles.taskText}>{item.tarefa}</Text>
            )}
            <View style={styles.actions}>
              {editingId === item.id ? (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => editTask(item.id, editingText)}
                >
                  <Feather name="save" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => { setEditingId(item.id); setEditingText(item.tarefa); }}
                >
                  <Feather name="edit" size={24} color="black" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                <Feather name="trash-2" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* Botão para fazer logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
