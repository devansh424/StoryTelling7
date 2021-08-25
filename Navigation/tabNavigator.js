import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import FeedScreen from '../Screens/feedScreen';
import StoryScreen from '../Screens/StoryScreen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

var Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
    return(
      <Tab.Navigator 
      labeled={false}
      activeColor="red"
      inactiveColor="cyan"
      barStyle={styles.barstyle}
      
      screenOptions={({route})=>({
          tabBarIcon:({focused,color,size})=>{
              let iconName
              if(route.name==="Home"){
                iconName = focused ? 'book' : 'book-outline';
              }else if(route.name==="Story"){
                iconName = focused ? 'create' : 'create-outline';
              }

              return <Ionicons name={iconName} size={RFValue(30)} color={color} />;
          }
      })}>
        <Tab.Screen name="Home" component={FeedScreen}/>
        <Tab.Screen name="Story" component={StoryScreen}/>
      </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  barstyle:{
    backgroundColor:"blue",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow:"hidden",
    position:"absolute",
    height:"8%"
  }
});

export default TabNavigator;