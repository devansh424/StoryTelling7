import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import FeedScreen from '../Screens/feedScreen';
import StoryScreen from '../Screens/storyScreen';
import { Icon } from "react-native-elements";

var Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
      <Tab.Navigator screenOptions={({route})=>({
          tabBarIcon:({focused,color,size})=>{
              let iconName
              if(route.name==="Home"){
                  return <Icon name="home" type="font-awesome"/>
              }else if(route.name==="Story"){
                return <Icon name="book" type="font-awesome"/>
              }
          }
      })}>
        <Tab.Screen name="Home" component={FeedScreen}/>
        <Tab.Screen name="Story" component={StoryScreen}/>
      </Tab.Navigator>
    );
}

export default TabNavigator;