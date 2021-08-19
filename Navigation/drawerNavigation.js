import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./tabNavigator";
import ProfileScreen from "../Screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;