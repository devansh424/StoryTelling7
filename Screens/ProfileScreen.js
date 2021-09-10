import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import StoryCardScreen from "./StoryCardScreen";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

let stories = require("../temp_stories.json");
let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontloaded: false,
      name: "",
      image: "",
      isEnabled: false,
      lightTheme: false,
    };
  }

  fetchUser = () => {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        this.setState({
          name: data.val().first_name + " " + data.val().last_name,
          image: data.val().profile_picture,
          isEnabled: data.val().current_theme === "dark" ? true : false,
          lightTheme: data.val().current_theme === "light" ? true : false,
        });
      });
  };

  toggleSwitch = () => {
      var previousState = this.state.isEnabled;
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .update({
        current_theme: !this.state.isEnabled ? "dark" : "light",
      });
    this.setState({
      lightTheme: previousState,
      isEnabled: !previousState,
    });
  };

  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontloaded: true,
    });
  }

  componentDidMount() {
    this.loadFontAsync();
    this.fetchUser();
  }

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.lightTheme ? styles.containerlight : styles.containerdark
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={this.state.lightTheme? styles.apptitlelight : styles.apptitledark}>ProfileScreen</Text>
          <Text style={this.state.lightTheme? styles.apptitlelight : styles.apptitledark} >{this.state.name}</Text>

          <View>
            <Text style={this.state.lightTheme? styles.darktext : styles.lighttext}>Dark theme</Text>
            <Switch
              thumbColor={this.state.isEnabled ? "blue" : "white"}
              value={this.state.isEnabled}
              onValueChange={() => {this.toggleSwitch()}}
            />
          </View>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  containerdark: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerlight: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  apptitlelight: {
    color: "#15193c",
    fontFamily: "BubblegumSans",
    fontSize: RFValue(30),
    marginBottom: RFValue(15),
  },
  apptitledark: {
    color: "white",
    fontFamily: "BubblegumSans",
    fontSize: RFValue(30),
    marginBottom: RFValue(15),
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    margin: 10,
  },
  darktext:{
    color:"#15193c"
  },
  lighttext:{
    color:"#ffffff"
  }
});
