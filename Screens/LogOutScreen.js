import React from "react";
import { View } from "react-native";
import firebase from "firebase";

export default class LogOutScreen extends React.Component{

    componentDidMount(){
        firebase.auth().signOut()
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <View>

            </View>
        );
    }
}