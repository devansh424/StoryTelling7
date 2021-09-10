import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log("firebase");
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("users/" + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: "dark",
                })
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential =
              firebase.auth.GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId == firebase.auth.GoogleAuthProvider.PROVIDER_ID && providerData[i].uid == googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "456790479123-ept2ibh7n7srav0smmjt2tdkilgnotdi.apps.googleusercontent.com",
        iosClientId:
          "456790479123-h4la841ek5sm2h6u4endmcqrf1v4uaft.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.image} />
        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => {
            this.signInWithGoogleAsync();
          }}
        >
          <Text>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "navy",
  },
  loginbutton: {
    backgroundColor: "aqua",
    padding: 20,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    margin: 10,
  },
});
