import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
export class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }
    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '301331475637-jaun4v92b12vtkhqhevtfbffr7prmn2t.apps.googleusercontent.com',
        });
        this.checkAuth()

    }

    checkAuth = async () => {
        let res = await AsyncStorage.getItem("idToken")
        console.log("res", res)
        if (res) {
            this.props.navigation.navigate("InfoPage")
        }
        this.setState({
            isLoading: false
        })

    }

    trackLogin = async (userData) => {

        let user = await firestore().collection('Users').doc(userData.profile.sub).get()
        if (user) {
            firestore().collection('Users').doc(userData.profile.sub)
                .update({
                    testArr: firestore.FieldValue.arrayUnion("76")
                })
        } else {
            firestore().collection('Users').doc(userData.profile.sub).set({
                email: userData.profile.email,
                family_name: userData.profile.family_name,
                given_name: userData.profile.given_name,
                createdAt: firestore.FieldValue.serverTimestamp(),
                testArr: [1]
            })
        }


    }



    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        AsyncStorage.setItem("idToken", JSON.stringify(idToken))
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        // // Sign-in the user with the credential
        let userData = await auth().signInWithCredential(googleCredential);

        this.trackLogin(userData.additionalUserInfo)
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
