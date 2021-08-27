import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./tabNavigator";
import FullStoryScreen from "../Screens/FullStoryScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Tab" component={TabNavigator}/>
            <Stack.Screen name="FullStory" component={FullStoryScreen}/>
        </Stack.Navigator>
    );
}

export default StackNavigator;