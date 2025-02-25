import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./app/presentation/views/auth/Login";
import RegistroScreen from "./app/presentation/views/auth/registro";
import HomeScreen from "./app/presentation/views/inicio/inicio";
import InicioScreen from "./app/presentation/views/inicio/inicio";


export type RootStackParamsList = {
    LoginScreen: undefined,
    RegistroScreen: undefined,
    InicioScreen: undefined

}
const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"InicioScreen"} component={InicioScreen}></Stack.Screen>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen}></Stack.Screen>
                <Stack.Screen name={"RegistroScreen"} component={RegistroScreen} options={{headerShown: true, title: "Registro"}}></Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>
    );
}

