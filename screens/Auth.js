import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export class Auth extends Component {


    onGoogleButtonPress = async () => {
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
    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    // size={GoogleSigninButton.Size.Wide}
                    // color={GoogleSigninButton.Color.Dark}
                    onPress={() => onGoogleButtonPress()}
                // disabled={this.state.isSigninInProgress} 
                />
            </View>
        )
    }
}

export default Auth


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})
