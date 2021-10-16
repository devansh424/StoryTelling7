import React from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

export default class CustomSideBarMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lighttheme:false
        };
    }

    componentDidMount(){
        firebase.database().ref("users/" + firebase.auth().currentUser.uid).on("value",(data)=>{
            this.setState({
                lighttheme:data.val().current_theme=="light"? true : false
            });
        });
    }

    render(){
        var props = this.props;
        return(
            <View style={this.state.lighttheme? styles.containerdark : styles.containerlight}>
               <Image source={require("../assets/logo.png")} style={styles.image} />
               <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props}/>
               </DrawerContentScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerdark: {
        flex: 1,
        backgroundColor: "#15193c",
    },
    containerlight: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    image:{
        width:150,
        height:150,
    }
});