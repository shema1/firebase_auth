import React from "react"
import { NavigationContainer } from "@react-navigation/native"

// const Stack = createS
export default function Navigation(){
    <NavigationContainer>

    </NavigationContainer>
}
const Stack = createStackNavigator()
function RootNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen />
        </Stack.Navigator>
    )
}