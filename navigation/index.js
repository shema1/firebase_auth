import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Auth from "../screens/Auth"
import { createStackNavigator } from '@react-navigation/stack';
import InfoPage from "../screens/InfoPage";
import GetStarted from "../screens/GetStarted";
// const Stack = createS
export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}
const Stack = createStackNavigator()
function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="InfoPage" component={InfoPage} />
            <Stack.Screen name="GetStarted" component={GetStarted} />

        </Stack.Navigator>
    )
}