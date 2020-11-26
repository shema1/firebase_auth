/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import Navigation from './navigation';
const App: () => React$Node = () => {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '301331475637-jaun4v92b12vtkhqhevtfbffr7prmn2t.apps.googleusercontent.com',
    });
  }, [])

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log("token", idToken)
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    let a = await auth().signInWithCredential(googleCredential);
    console.log("a", a)
    return a
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
        {/* <TouchableOpacity onPress={() => onGoogleButtonPress()}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          // size={GoogleSigninButton.Size.Wide}
          // color={GoogleSigninButton.Color.Dark}
          onPress={() => onGoogleButtonPress()}
        // disabled={this.state.isSigninInProgress} 
        /> */}
        <Navigation/>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
