import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, Image } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font"; 
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import StoryCardScreen from "./StoryCardScreen";
import { RFValue } from "react-native-responsive-fontsize";

let stories = require("../temp_stories.json");
let customFonts = {"BubblegumSans":require("../assets/fonts/BubblegumSans-Regular.ttf")}

export default class FeedScreen extends React.Component{
    constructor(){
        super();
        this.state={
            fontloaded:false
        }
    }

    async loadFontAsync(){
        await Font.loadAsync(customFonts);
        this.setState({
            fontloaded:true
        });
    }

    renderItem = ({item,index}) => {
        return(
           <StoryCardScreen story={item} navigation={this.props.navigation}/>
        );
    }

    componentDidMount(){
        this.loadFontAsync();
    }

    render(){
        if(!this.state.fontloaded){
            return <AppLoading/>;
        }else{
            return(
                <View style={styles.container}> 
                    <SafeAreaView style={styles.droidSafeArea}/>
                        <Text style={styles.apptitle}>
                            FeedScreen
                        </Text>
                    <FlatList data={stories} keyExtractor={(item,index)=>index.toString()} renderItem={this.renderItem} />
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#15193c",
    },
    droidSafeArea:{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35) 
    },
    apptitle:{
        color:"white",
        fontFamily:"BubblegumSans",
        fontSize:RFValue(30),
        marginBottom:RFValue(15),
    }
});