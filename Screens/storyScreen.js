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
  TextInput,
  ScrollView,
  Alert,
  ShadowPropTypesIOS,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import StoryCardScreen from "./StoryCardScreen";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

let stories = require("../temp_stories.json");
let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class StoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      previewimage: "image_1",
      dropdownheight: 40,
      title: "",
      description: "",
      story: "",
      moral: "",
      open:false,
      lighttheme:false
    };
  }

  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontloaded: true,
    });
  }

  addStory = async () =>{
    if(this.state.title && this.state.description && this.state.story && this.state.moral){
      await firebase.database().ref("stories/" + Math.random().toString(32).slice(2)).update({
        title:this.state.title,
        description:this.state.description,
        story:this.state.story,
        moral:this.state.moral,
        author:firebase.auth().currentUser.displayName,
        author_uid:firebase.auth().currentUser.uid,
        create_on:new Date(),
        likes:0,
      });
    }else{
      Alert.alert("Fill all the information");
    }
  }

  componentDidMount() {
    this.loadFontAsync();
    var theme;
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        theme = data.val().current_theme;
        this.setState({
          lighttheme: theme === "light" ? true : false,
        });
      });
  }

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      var previewimages = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png"),
      };

      return (
        <View style={this.state.lighttheme? styles.containerlight : styles.containerdark}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={this.state.lighttheme? styles.apptitlelight : styles.apptitledark}>CreateStoryScreen</Text>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <Image
                source={previewimages[this.state.previewimage]}
                style={{
                  width: RFValue(100),
                  height: RFValue(100),
                  alignSelf: "center",
                  borderRadius: RFValue(10),
                  marginBottom: RFValue(10),
                }}
              />
              <View style={{ height: RFValue(this.state.dropdownheight) }}>
                <DropDownPicker
                  items={[
                    { label: "image1", value: "image_1" },
                    { label: "image2", value: "image_2" },
                    { label: "image3", value: "image_3" },
                    { label: "image4", value: "image_4" },
                    { label: "image5", value: "image_5" }
                  ]}
                  style={this.state.lighttheme? styles.dropdownstylelight : styles.dropdownstyledark}
                  containerStyle={{
                    height: RFValue(20),
                    borderRadius: RFValue(20),
                    backgroundColor:"#15193c",
                  }}
                  itemStyle={{ justifyContent: "flex-start" }}
                  textStyle={{ color: "#15193c", fontFamily: "BubblegumSans" }}
                  onOpen={() => {
                    this.setState({ dropdownheight: 170 , open:true});
                  }}
                  onClose={() => {
                    this.setState({ dropdownheight: 40 , open:false});
                  }}
                  arrowStyle={{ color: "white" }}
                  open={this.state.open}
                />
              </View>
              <View style={{marginTop:RFValue(30)}}>
              <TextInput
                placeholder={"title"}
                onChangeText={(text) => {
                  this.setState({ title: text });
                }}
                style={this.state.lighttheme? styles.inputstyleslight : styles.inputstylesdark}
              ></TextInput>
              <TextInput
                placeholder={"story"}
                onChangeText={(text) => {
                  this.setState({ story: text });
                }}
                style={this.state.lighttheme? styles.inputstyleslight : styles.inputstylesdark}
              ></TextInput>
              <TextInput
                placeholder={"moral"}
                onChangeText={(text) => {
                  this.setState({ moral: text });
                }}
                style={this.state.lighttheme? styles.inputstyleslight : styles.inputstylesdark}
              ></TextInput>
              <TextInput
                placeholder={"description"}
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
                style={this.state.lighttheme? styles.inputstyleslight : styles.inputstylesdark}
              ></TextInput>
              </View>

              <TouchableOpacity style={this.state.lighttheme? styles.buttonlight : styles.buttondark} onPress={()=>{
                this.addStory()
              }}>
                <Text style={this.state.lighttheme? styles.lighttext : styles.darktext}>
                  Submit
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  inputstyleslight: {
    backgroundColor:"#15193c",
    borderColor:"#15193c",
    borderRadius:50,
    borderWidth: RFValue(1),
    padding:RFValue(10),
    color:"white",
    margin:RFValue(5),
  },
  inputstylesdark: {
    backgroundColor:"white",
    borderRadius:50,
    borderColor:"white",
    borderWidth: RFValue(1),
    padding:RFValue(10),
    color:"#15193c",
    margin:RFValue(5),
  },
  containerdark: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerlight: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    color:"white"
  },
  buttondark:{
    alignSelf:"center",
    padding:20,
    textAlign:"center",
    borderRadius:30,
    backgroundColor:"white"
  },
  buttonlight:{
    alignSelf:"center",
    padding:20,
    textAlign:"center",
    borderRadius:30,
    backgroundColor:"#15193c"
  },
  dropdownstyledark:{
    color:"white",
    backgroundColor:"white"
  },
  dropdownstylelight:{
    color:"#15193c",
    backgroundColor:"#15193c"
  }
});
