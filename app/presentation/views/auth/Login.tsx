import React, { useState } from "react";
import {View, StyleSheet, Image,TouchableOpacity} from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import {PropsStackNavigation} from "../../interfaces/StackNav";


function LoginScreen({navigation, route}: PropsStackNavigation) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (password === confirmPassword) {
            console.log("Registro exitoso:", email);
        } else {
            console.log("Las contraseñas no coinciden");
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Cuenta</Text>
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

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                <TouchableOpacity onPress={() => {navigation.navigate("InicioScreen")}}>
                Iniciar Sesion
                </TouchableOpacity>
            </Button>

            <TouchableOpacity onPress={() => {navigation.navigate("RegistroScreen")}}>
                <text style={styles.registro}>Aún no tienes cuenta? Registrate aquí</text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    registro: {
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        marginTop: 30,

    },

    contenedor: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0B0B0",
        padding: 20,
    },
    titulo: {
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

export default LoginScreen;