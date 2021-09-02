import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './Screens/loginScreen';
import LoadingScreen from './Screens/loadingScreen';
import DashBoardScreen from './Screens/dashBoardScreen';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';
import { firebaseConfig } from './Config';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

var Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Dashboard" component={DashBoardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}