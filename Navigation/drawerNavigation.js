import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stackNavigation";
import LogOutScreen from "../Screens/LogOutScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CustomSideBarMenu from "../Screens/customSideBarMenu";
import firebase from "firebase";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lighttheme: false,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (data) => {
        this.setState({
          lighttheme: data.val().current_theme === "light" ? true : false,
        });
      });
  }

  render() {
    var props = this.props;
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContentOptions={{
          activeTintColor: "black",
          inactiveTintColor: "white",
        }}
        drawerContent={props => <CustomSideBarMenu {...props} />}
      >
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="LogOut" component={LogOutScreen} />
      </Drawer.Navigator>
    );
  }
}
