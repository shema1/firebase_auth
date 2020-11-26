import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '301331475637-jaun4v92b12vtkhqhevtfbffr7prmn2t.apps.googleusercontent.com',
        });
        

    }

    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        auth().signInWithCredential(googleCredential);
        this.props.navigation.navigate("InfoPage")

    }
    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    // size={GoogleSigninButton.Size.Wide}
                    // color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.onGoogleButtonPress()}
                // disabled={this.state.isSigninInProgress} 
                />
                {this.state.isLoading && <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>}
            </View>
        )
    }
}

export default Auth


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    loading: {
        position: "absolute", backgroundColor: "#2424244f", width: "100%", height: "100%", justifyContent: "center"
    }
})
