import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/login';  // Importing index.js by default
import Register from './src/pages/register';  // Importing index.js by default
import ResetPassword from './src/pages/resetPassword';  // Importing index.js by default
// import ChangePassword from './src/pages/changePassword';
import Tarefas from './src/pages/tarefa';  // Importing index.js by default

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Tarefas" component={Tarefas} />
        {/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
