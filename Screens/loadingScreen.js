import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as firebase from "firebase";

export default class LoadingScreen extends React.Component{
    
    componentDidMount(){
        this.checkLogin();
    }

    checkLogin = () => {
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate("Dashboard");
            }else{
                this.props.navigation.navigate("Login");
            }
        });
    }

    render(){
        return(
            <AppLoading  />
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
});