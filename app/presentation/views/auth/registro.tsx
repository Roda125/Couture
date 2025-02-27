import React, { useState } from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import {PropsStackNavigation} from "../../interfaces/StackNav";

export function RegistroScreen({navigation, route}: PropsStackNavigation) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO</Text>
            <Image source={require("../../../../assets/user-icon.svg")} style={styles.image} />

            <TextInput
                label="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                label="Repetir Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button
                mode="contained"
                style={styles.button}
                disabled={!email || !password || !confirmPassword}>
                <TouchableOpacity onPress={() => {navigation.navigate("LoginScreen")}}>
                Registrarse

                </TouchableOpacity>

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0B0B0",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: "black",
    },
});

export default RegistroScreen;
