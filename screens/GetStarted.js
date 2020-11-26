import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-community/google-signin';
export class GetStarted extends Component {

    _renderGoBackBtn = () => {
        return (
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => this.props.navigation.goBack()}
            >
                <Icon name="arrow-left" size={20} color="#000" />
                <Text style={{ marginLeft: 10, fontWeight: "700" }} >BACK</Text>
            </TouchableOpacity>
        )
    }

    _renderLogOutBtn = () => {
        return <Text onPress={() => {
            GoogleSignin
                .signOut()
                .then(() => {
                    this.props.navigation.navigate("Auth")
                    AsyncStorage.removeItem("idToken")
                })
                .catch(err => console.log("err", err));
        }}>Log Out</Text>
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={() => this._renderGoBackBtn()}
                    rightComponent={() => this._renderLogOutBtn()}
                    containerStyle={{ backgroundColor: "#24242447" }}
                />
                <View style={{ alignItems: "center" }}>
                    <Image
                        source={require("../assets/images/getStarted.jpg")}
                        style={{ marginTop: 50 }}
                    />
                </View>

            </View>
        )
    }
}

export default GetStarted
