import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import FeedScreen from '../Screens/feedScreen';
import StoryScreen from '../Screens/StoryScreen';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

var Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      lighttheme:false
    }
  }

  componentDidMount(){
    var theme 
    firebase.database().ref("users/" + firebase.auth().currentUser.uid).on("value",data=>{
      theme=data.val().current_theme
      this.setState({
        lighttheme:theme === "light"? true : false
      });
    });
  }

  render(){
    return(
      <Tab.Navigator 
      labeled={false}
      activeColor="red"
      inactiveColor="cyan"
      barStyle={this.state.lighttheme? styles.barstylelight : styles.barstyledark}
      
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
}

const styles = StyleSheet.create({
  barstylelight:{
    backgroundColor:"white",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow:"hidden",
    position:"absolute",
    height:"8%"
  },
  barstyledark:{
    backgroundColor:"blue",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    overflow:"hidden",
    position:"absolute",
    height:"8%"
  }
});