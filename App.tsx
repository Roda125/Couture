import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./app/presentation/views/auth/Login";
import RegistroScreen from "./app/presentation/views/auth/registro";
import InicioScreen from "./app/presentation/views/inicio/inicio";
import AccesoriosScreen from "./app/presentation/views/Accesorios/accesorios";
import {HombreScreen} from "./app/presentation/views/Hombres/hombres";
import {MujerScreen} from "./app/presentation/views/Mujeres/mujeres";
import {NinosScreen} from "./app/presentation/views/Niños/niños";


export type RootStackParamsList = {
    LoginScreen: undefined;
    RegistroScreen: undefined;
    InicioScreen: undefined;
    AccesoriosScreen: undefined;
    HombreScreen: undefined;
    NinosScreen: undefined;
    MujerScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"InicioScreen"} component={InicioScreen}></Stack.Screen>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen}></Stack.Screen>
                <Stack.Screen name={"RegistroScreen"} component={RegistroScreen} options={{headerShown: true, title: "Registro"}}></Stack.Screen>
                <Stack.Screen name={"HombreScreen"} component={HombreScreen}></Stack.Screen>
                <Stack.Screen name={"MujerScreen"} component={MujerScreen}></Stack.Screen>
                <Stack.Screen name={"NinosScreen"} component={NinosScreen}></Stack.Screen>
                <Stack.Screen name={"AccesoriosScreen"} component={AccesoriosScreen}></Stack.Screen>
            </Stack.Navigator>

        </NavigationContainer>
    );
}

