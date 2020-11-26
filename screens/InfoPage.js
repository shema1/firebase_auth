import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit"
import { Header } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin } from '@react-native-community/google-signin';
export class InfoPage extends Component {

    componentDidMount() {
        // const usersCollection = firestore().collection('LoginInfo').doc("NStEqgY8WN3kWk6t4Uz5").get();
        // console.log("usersCollection", usersCollection)
        this.getData()
    }

    getData = async () => {
        let usersCollection = await firestore().collection('test').get()
        console.log("usersCollection", usersCollection)
        // firestore()
        //     .collection('test')
        //     .add({
        //         id:10,
        //         name: 'Ada Lovelace',
        //         age: 30,
        //     })
        //     .then(() => {
        //         console.log('User added!');
        //     });

        // firebase.firestore().collection("collection").doc(doc.id)
        // .set({EmloyeeDetails: [{Id:3, Name: Test3, Mail:zzz@yyy.com, ContactNo: 5432167890}]}, {merge: true});

        const user = await firestore()
        console.log("user", user)
        // let testFirebase = firestore().collection('Users').doc('ABC2')
        // testFirebase.update({
        //     test: firestore().FieldValue.arrayUnion("99")
        // })
        // firestore()
        //     .collection('Users')
        //     .doc('ABC2')
        //     .set({
        //         //   name: 'Ada Lovelace',
        //         //   age: 32,
        //         test: [16]
        //     }, { merge: true })
        //     .then(() => {
        //         console.log('User added!');
        //     });
    }

    getStarted = () => {
        return (
            <TouchableOpacity style={styles.getStartedBtn}>
                <Text style={styles.getStartedBtnText}>Get started</Text>
            </TouchableOpacity>
        )
    }

    logOut = () => {
        return (
            <Text onPress={() => {
                GoogleSignin
                    .signOut()
                    .then((res) => {
                        console.log('User signed out!',res)
                        this.props.navigation.navigate("Auth")
                    })
                    .catch(err => console.log("err", err));
            }} style={{ fontWeight: "700" }}>Log Out</Text>
        )
    }

    render() {
        return (
            <View>
                <Header leftComponent={this.getStarted}
                    rightComponent={this.logOut}
                    containerStyle={{ backgroundColor: "#24242447" }}
                />
                <Text>Info Page2</Text>
                <LineChart
                    data={{
                        labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00"],
                        datasets: [
                            {
                                data: [
                                    1,
                                    12
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={320}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        )
    }
}

export default InfoPage

const styles = StyleSheet.create({
    getStartedBtn: {
        backgroundColor: "#2424247a",
        borderRadius: 12,
        paddingVertical: 8,
        width: 120,
        alignItems: "center"
    },

})