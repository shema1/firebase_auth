import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Auth from "../screens/Auth"
import { createStackNavigator } from '@react-navigation/stack';
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
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
    )
}