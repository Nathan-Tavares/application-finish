# TaskManager

TaskManager é uma aplicação de gerenciamento de tarefas construída com React Native e Firebase. O objetivo deste projeto é permitir que os usuários criem, editem e excluam tarefas, bem como gerenciem suas contas de usuário com autenticação segura.

## Funcionalidades

- **Autenticação de Usuário**: Registro, login e redefinição de senha usando Firebase Authentication.
- **Gerenciamento de Tarefas**: Adicionar, editar e excluir tarefas.
- **Alertas Personalizados**: Notificações amigáveis para ações do usuário.
- **Persistência de Dados**: Uso do Firestore para armazenamento de dados de tarefas.

## Estrutura do Projeto

src/
├── components/
│ └── CustomAlert.js # Componente de alerta personalizado
├── config/
│ └── firebase.js # Configuração do Firebase
├── pages/
│ ├── login/
│ │ ├── index.js # Tela de login
│ │ └── style.js # Estilos da tela de login
│ ├── register/
│ │ ├── index.js # Tela de registro
│ │ └── style.js # Estilos da tela de registro
│ ├── resetPassword/
│ │ ├── index.js # Tela de redefinição de senha
│ │ └── style.js # Estilos da tela de redefinição de senha
│ └── tarefas/
│ ├── index.js # Tela de gerenciamento de tarefas
│ └── style.js # Estilos da tela de gerenciamento de tarefas
└── App.js # Componente principal da aplicação


## Pré-requisitos

- Node.js (versão recomendada: 14.x ou superior)
- Expo CLI
- Conta no Firebase

## Configuração

### 1. Clonar o Repositório

```sh
git clone https://github.com/Nathan-Tavares/application-finish.git
cd application-finish

npm install

3. Configurar o Firebase
Crie um projeto no Firebase Console.
Adicione um aplicativo web ao seu projeto Firebase e copie a configuração do Firebase.
Substitua o conteúdo do arquivo src/config/firebase.js com as suas configurações do Firebase:

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential };

expo start

Uso
Login
Abra o aplicativo.
Insira seu email e senha.
Clique no botão "Entrar".
Registro
Na tela de login, clique em "Criar conta".
Insira seu email e senha.
Clique no botão "Registrar".
Redefinição de Senha
Na tela de login, clique em "Esqueceu a senha?".
Insira seu email.
Clique no botão "Enviar".
Gerenciamento de Tarefas
Após o login, você verá a tela de tarefas.
Adicione uma nova tarefa usando o campo de entrada e o botão "Adicionar".
Edite uma tarefa clicando no ícone de editar, altere o texto e salve.
Exclua uma tarefa clicando no ícone de lixeira.
Faça logout clicando no botão "Logout".

Contribuição

Faça um fork do projeto.
Crie uma nova branch (git checkout -b feature/nova-feature).
Faça commit das suas alterações (git commit -am 'Adiciona nova feature').
Envie para a branch (git push origin feature/nova-feature).
Abra um Pull Request.
