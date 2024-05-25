import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9LYmTePB36JIsjmlEUiXPymzU_CBEHnk",
  authDomain: "tarefa-listagem.firebaseapp.com",
  projectId: "tarefa-listagem",
  storageBucket: "tarefa-listagem.appspot.com",
  messagingSenderId: "732943145733",
  appId: "1:732943145733:web:013b45dd94f8872ed6b56c",
  measurementId: "G-80HNSVELDY"
};

// Iniciando Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação do Firebase com persistência usando AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

// Exporta as instâncias de autenticação e Firestore, e funções relacionadas à autenticação
export { auth, db, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential };
