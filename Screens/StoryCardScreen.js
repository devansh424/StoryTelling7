import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

let stories = require("../temp_stories.json");
let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class StoryCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
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

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity style={styles.container} onPress={()=>{
          this.props.navigation.navigate("FullStory",{story:this.props.story});
        }}>
          <View>
            <Image
              source={require("../assets/story_image_1.png")}
              style={{
                width: RFValue(100),
                height: RFValue(100),
                alignSelf: "center",
                borderRadius: RFValue(10),
                marginBottom: RFValue(10),
              }}
            />
            <Text style={styles.apptext}>{this.props.story.title}</Text>
            <Text style={styles.apptext}>{this.props.story.author}</Text>
            <Text style={styles.apptext}>{this.props.story.description}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#15293d",
    borderRadius:RFValue(30),
    marginTop:RFValue(20),
  },
  apptext: {
    color: "white",
    fontFamily: "BubblegumSans",
    fontSize: RFValue(10),
    textAlign: "center",
    marginBottom: RFValue(10),
  },
});
