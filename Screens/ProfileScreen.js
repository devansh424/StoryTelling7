import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class ProfileScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}> 
                <Text>
                    ProfileScreen
                </Text>
            </View>
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