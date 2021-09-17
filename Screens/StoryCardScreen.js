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
      lighttheme:false,
      story_id:this.props.story.key,
      story_data:this.props.story.value,
      is_liked:false,
      likes:this.props.story.value.likes
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

  likeAction = () => {
    if(this.state.is_liked){
      firebase.database().ref("stories/").child(this.state.story_id).child("likes").set(firebase.database.ServerValue.increment(-1))
    }
  }

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      return (
        <View>
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
          <TouchableOpacity onPress={this.likeAction()}>
            <Text>
              like
            </Text>
          </TouchableOpacity>
        </View>
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
