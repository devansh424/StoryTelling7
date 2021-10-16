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
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import StoryCardScreen from "./StoryCardScreen";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      lighttheme: false,
      stories: [],
    };
  }

  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontloaded: true,
      lighttheme: false,
    });
  }

  fetchUser = () => {
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
  };

  fetchStories = () => {
    firebase
      .database()
      .ref("stories/")
      .on("value", (data) => {
        var stories = [];
        console.log(data.val())
        if (data.val()) {
          Object.keys(data.val()).forEach((key) => {
            stories.push({
              key: key,
              value: data.val()[key],
            });
          });
        }
        this.setState({
          stories: stories,
        });
        console.log(stories);
      });
  };

  renderItem = ({ item, index }) => {
    return <StoryCardScreen story={item} navigation={this.props.navigation} />;
  };

  componentDidMount() {
    this.loadFontAsync();
    // this.fetchUser();
    this.fetchStories();
  }

  render() {
    if (!this.state.fontloaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.lighttheme ? styles.containerlight : styles.containerdark
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.apptitle}>FeedScreen</Text>
          <FlatList
            data={this.state.stories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
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
  darktext: {
    color: "#15193c",
  },
  lighttext: {
    color: "#ffffff",
  },
});
