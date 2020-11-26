import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import {
    LineChart,
} from "react-native-chart-kit"
import { Header } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment"
export class InfoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            chartData: [0]
        };
    }

    componentDidMount() {
        this.sunscribeToChange()
    }
    componentWillUnmount() {
        return this.sunscribeToChange()
    }

    sunscribeToChange = async () => {
        let userId = await AsyncStorage.getItem("idToken")
        firestore()
            .collection('Users')
            .doc(JSON.parse(userId))
            .onSnapshot(documentSnapshot => {
                this.setState({
                    user: { ...documentSnapshot.data() }
                }, () => this.getDataForChart())
            });
    }

    getDataForChart = async () => {
        let todayLogin = this.state.user.log?.filter(elem => moment(elem).format("M-D-YYYY") === moment().format("M-D-YYYY"))
        let result = []
        for (let index = 0; index < 24; index++) {
            let res = todayLogin?.filter(elem => moment(new Date(elem.toDate())).format("H") == index)
            if (res?.length) {
                result.push(res.length)
            } else {
                result.push(0)
            }
        }
        this.setState({
            chartData: result
        })
    }

    getStarted = () => {
        return (
            <TouchableOpacity style={styles.getStartedBtn} onPress={()=>this.props.navigation.navigate("GetStarted")}>
                <Text style={styles.getStartedBtnText}>Get started</Text>
            </TouchableOpacity>
        )
    }
    logOut = () => {
        GoogleSignin
            .signOut()
            .then(() => {
                this.props.navigation.navigate("Auth")
                AsyncStorage.removeItem("idToken")
            })
            .catch(err => console.log("err", err));
    }

    logOutBtn = () => {
        return (
            <>
                <Text>{this.state.user.given_name}</Text>
                <Text onPress={() => this.logOut()} style={{ fontWeight: "700" }}>Log Out</Text>
            </>
        )
    }

    render() {
        const { user, chartData } = this.state
        return (
            <View>
                <Header leftComponent={this.getStarted}
                    rightComponent={this.logOutBtn}
                    containerStyle={{ backgroundColor: "#24242447" }}
                />
                <View style={{alignItems:"center"}}>
                    <Text style={styles.title}>Logs info</Text>
                    <Text style={styles.subTitle}>See below the time and logs info</Text>
                </View>
                <ScrollView horizontal>
                    <LineChart
                        data={{
                            labels: ["00:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                            datasets: [
                                {
                                    data: chartData
                                }
                            ]
                        }}
                        width={1000}
                        height={350}
                        yAxisInterval={1}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#24242447",
                            backgroundGradientTo: "#24242447",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#928d8d"
                            }
                        }}
                        style={styles.chartStyle}
                    />
                </ScrollView>
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
    chartStyle: {
        marginVertical: 8,
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 20
    },
    title:{
        fontWeight:"700",
        fontSize:30,
        marginTop:10
    },
    subTitle:{

    }

})