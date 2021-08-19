import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './Navigation/drawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}