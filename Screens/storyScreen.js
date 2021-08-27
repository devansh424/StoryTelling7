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
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { fonts } from "react-native-elements/dist/config";
import { FlatList } from "react-native-gesture-handler";
import StoryCardScreen from "./StoryCardScreen";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

let stories = require("../temp_stories.json");
let customFonts = {
  BubblegumSans: require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class FeedScreen extends React.Component {
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
      var previewimages = {
        image_1: require("../assets/story_image_1.png"),
        image_2: require("../assets/story_image_2.png"),
        image_3: require("../assets/story_image_3.png"),
        image_4: require("../assets/story_image_4.png"),
        image_5: require("../assets/story_image_5.png"),
      };

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <Text style={styles.apptitle}>CreateStoryScreen</Text>
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
                  style={{ backgroundColor: "#15193c" }}
                  containerStyle={{
                    height: RFValue(20),
                    borderRadius: RFValue(20),
                    backgroundColor:"#15193c",
                  }}
                  itemStyle={{ justifyContent: "flex-start" }}
                  textStyle={{ color: "yellow", fontFamily: "BubblegumSans" }}
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
                style={styles.inputstyles}
              ></TextInput>
              <TextInput
                placeholder={"story"}
                onChangeText={(text) => {
                  this.setState({ story: text });
                }}
                style={styles.inputstyles}
              ></TextInput>
              <TextInput
                placeholder={"moral"}
                onChangeText={(text) => {
                  this.setState({ moral: text });
                }}
                style={styles.inputstyles}
              ></TextInput>
              <TextInput
                placeholder={"description"}
                onChangeText={(text) => {
                  this.setState({ description: text });
                }}
                style={styles.inputstyles}
              ></TextInput>
              </View>
            </ScrollView>
          </View>
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
  inputstyles: {
    borderWidth: RFValue(1),
    padding:RFValue(10),
    color:"white",
    margin:RFValue(5),
  },
});
