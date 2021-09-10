import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stackNavigation";
import LogOutScreen from "../Screens/LogOutScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator screenOptions={{headerShown:false}}>
            <Drawer.Screen name="Home" component={StackNavigator}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
            <Drawer.Screen name="LogOut" component={LogOutScreen}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;