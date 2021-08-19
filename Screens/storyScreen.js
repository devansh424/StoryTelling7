import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class StoryScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}> 
                <Text>
                    StoryScreen
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