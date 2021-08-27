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
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Speech from "expo-speech";

let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FullStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      fontloaded: false,
      speakercolor: "gray",
      speakericon: "volume-high-outline",
    };
  }

  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontloaded: true,
    });
  }

  componentDidMount() {
    this.loadFontAsync();
  }

  initiateSpeaker = async (title, author, story, moral) => {
    this.setState({
      speakercolor: this.state.speakercolor === "gray" ? "white" : "gray",
      speakericon: this.state.speakericon === "volume-high-outline" ? "volume-low-outline" : "volume-high-outline"
    });
    if (this.state.speakercolor === "white") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak(`the moral of the story is ${moral}`);
    } else {
      Speech.stop();
    }
  };

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ScrollView>
            <Text style={styles.apptitle}>FullStoryScreen</Text>
            <TouchableOpacity style={styles.button}
              onPress={() => {
                this.setState({
                    speakericon:"volume-low-outline"
                })
                this.initiateSpeaker(
                  this.props.route.params.story.title,
                  this.props.route.params.story.author,
                  this.props.route.params.story.story,
                  this.props.route.params.story.moral
                );
              }}
            >
              <Ionicons
                size={RFValue(30)}
                name={this.state.speakericon}
                color={this.state.speakercolor}
              />
            </TouchableOpacity>
            <Text style={styles.storytitle}>
              {this.props.route.params.story.title}
            </Text>
            <Text style={styles.storytitle}>
              {this.props.route.params.story.author}
            </Text>
            <Text style={styles.storytitle}>
              {this.props.route.params.story.created_on}
            </Text>
            <Text style={styles.storytitle}>
              {this.props.route.params.story.story}
            </Text>
            <Text style={styles.storytitle}>
              {this.props.route.params.story.moral}
            </Text>
          </ScrollView>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  apptitle: {
    color: "white",
    fontFamily: "BubblegumSans",
    fontSize: RFValue(30),
    marginBottom: RFValue(15),
  },
  storytitle: {
    color: "white",
    fontFamily: "BubblegumSans",
    fontSize: RFValue(15),
    marginBottom: RFValue(15),
  },
  button:{
      margin:RFValue(10),
      width:RFValue(30),
      height:RFValue(30),
  }
});
